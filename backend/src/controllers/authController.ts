import type { RequestHandler, Response } from "express";
import User, { type IUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import AppError from "../utils/appError.js";
import env from "../utils/envConfig.js";
import Session from "../models/sessionModel.js";
import { assignTokenCookies, clearTokenCookies } from "../utils/cookies.js";
import { generateTokens } from "../utils/tokens.js";

async function sendUserTokens(
  statusCode: number,
  res: Response,
  user: IUser & { id: string },
) {
  // 1) Filter only data to be sent
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  // 2) Create session
  const session = await Session.create({
    userId: user.id,
    expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN_MS),
  });

  // 3) Generate Tokens based on session and user id "Refresh token only has sId"
  const tokens = generateTokens(user.id, session.id);

  // 4) Store refresh token to prevent using old tokens even if still valid
  session.refreshToken = tokens.refreshToken;
  await session.save();

  // 5) Assign these tokens to Cookies
  assignTokenCookies(res, tokens);
  res.status(statusCode).json({ status: "success", data: { user: userData } });
}

export const signup: RequestHandler = async function (req, res) {
  const createdUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  await sendUserTokens(201, res, createdUser);
};

export const login: RequestHandler = async function (req, res) {
  const { email, password } = req.body;

  // 1) Checks if email or password not exists
  if (typeof email !== "string" || typeof password !== "string")
    throw new AppError("Please valid provie email and password", 400);

  // 2) Check if user exist and if password correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new AppError("Invalid email or password", 401);

  await sendUserTokens(200, res, user);
};

type RefreshPayload = {
  id: string;
  sId: string;
};

export const refreshToken: RequestHandler = async function (req, res) {
  // 1) Extract refresh token from cookies
  const token = req.cookies.refreshToken;
  if (!token) throw new AppError("Session Expired", 401);

  // 2) Verify Refresh token
  let payload: RefreshPayload;
  try {
    payload = jwt.verify(token, env.REFRESH_TOKEN_KEY) as RefreshPayload;
  } catch {
    clearTokenCookies(res);
    throw new AppError("Session Expired", 401);
  }

  // 3) Check if user has session
  const session = await Session.findOne({
    _id: payload.sId,
    userId: payload.id,
  });

  if (!session) {
    clearTokenCookies(res);
    throw new AppError("Session Expired", 401);
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  if (session.refreshToken !== hashedToken) {
    await session.deleteOne();
    clearTokenCookies(res);
    throw new AppError("Session Expired", 401);
  }

  // 4) Create new tokens and send it
  const newTokens = generateTokens(payload.id, payload.sId);

  session.refreshToken = newTokens.refreshToken;
  session.expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN_MS);
  await session.save();

  assignTokenCookies(res, newTokens);
  res.status(204).end();
};
