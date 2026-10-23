import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import { globalErrorController } from "./controllers/errorController.js";

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use(globalErrorController);

export default app;
