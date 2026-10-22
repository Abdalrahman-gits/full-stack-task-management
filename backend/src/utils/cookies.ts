import type { Response } from "express";
import env from "./envConfig.js";

const cookieBase = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
} as const;

export function assignTokenCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string },
) {
  res.cookie("accessToken", tokens.accessToken, {
    ...cookieBase,
    maxAge: env.ACCESS_TOKEN_EXPIRES_IN_MS,
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    ...cookieBase,
    maxAge: env.REFRESH_TOKEN_EXPIRES_IN_MS,
  });
}

export function clearTokenCookies(res: Response) {
  res.clearCookie("accessToken", cookieBase);
  res.clearCookie("refreshToken", cookieBase);
}
