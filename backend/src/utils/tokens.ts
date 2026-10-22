import jwt from "jsonwebtoken";
import env from "./envConfig.js";

export function generateTokens(
  userId: string,
  sessionId: string,
): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = jwt.sign({ id: userId }, env.ACCESS_TOKEN_KEY, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN_MS / 1000, // In Seconds
  });

  const refreshToken = jwt.sign(
    { id: userId, sId: sessionId },
    env.REFRESH_TOKEN_KEY,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN_MS / 1000, // In Seconds
    },
  );

  return { accessToken, refreshToken };
}
