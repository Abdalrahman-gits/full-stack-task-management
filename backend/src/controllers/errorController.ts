import type { ErrorRequestHandler } from "express";

export const globalErrorController: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  console.log("from global error");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  err.status = err.status || "error";

  res
    .status(err.statusCode)
    .json({ status: "fail", message: err.message, err });
};
