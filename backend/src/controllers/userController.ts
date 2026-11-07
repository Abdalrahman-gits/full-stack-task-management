import type { RequestHandler } from "express";
import AppError from "../utils/appError.js";

export const getMe: RequestHandler = async function (req, res) {
  // 1) Check if user exists
  if (!req.user) throw new AppError("User is not exist", 401);

  // 2) Send user data
  res.status(200).json({ status: "success", data: { user: req.user } });
};
