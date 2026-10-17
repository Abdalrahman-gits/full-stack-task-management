import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

export default app;
