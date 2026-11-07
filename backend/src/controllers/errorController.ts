import type { ErrorRequestHandler, Response } from "express";
import env from "../utils/envConfig.js";
import AppError from "../utils/appError.js";
import type mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";

type ErrorType = Error & {
  statusCode: number;
  status: string;
  isOperational?: boolean;
  errors?: { field: string; message: string }[];
};

function sendDevError(err: ErrorType, res: Response) {
  res
    .status(err.statusCode)
    .json({ message: err.message, status: err.status, err });
}

function sendProdError(err: ErrorType, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
}

const handleCastErrDB = (err: mongoose.Error.CastError) =>
  new AppError("Invalid input", 400, [
    {
      field: err.path,
      message: `Invalid value for ${err.path}`,
    },
  ]);

const handleValidationErrDB = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((issue) => ({
    field: issue.path,
    message: issue.message,
  }));

  return new AppError("Validation Failed", 400, errors);
};

const handleDuplicatedFieldsDB = (err: MongoServerError) => {
  const key = Object.keys(err.keyValue ?? {})[0] || "unknown";
  return new AppError("Duplicate field", 409, [
    {
      field: key,
      message: `${key} is already exist`,
    },
  ]);
};

const handleValidationZod = (err: ZodError) => {
  const errors = err.issues.map((zodErr) => ({
    field: zodErr.path.join(".") || "body",
    message: zodErr.message,
  }));

  return new AppError("Validation Failed", 400, errors);
};

export const globalErrorController: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrDB(err);
    if (err.name === "ValidationError") err = handleValidationErrDB(err);
    if (err.cause?.code === 11000) err = handleDuplicatedFieldsDB(err.cause);
    if (err instanceof ZodError) err = handleValidationZod(err);

    sendProdError(err, res);
  }
};
