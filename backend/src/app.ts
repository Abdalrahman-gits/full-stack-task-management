import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import { globalErrorController } from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.use("/{*splate}", (req, _res, next) => {
  next(
    new AppError(`Route ${req.params.splate?.join("/")} is not exist!`, 404),
  );
});
app.use(globalErrorController);

export default app;
