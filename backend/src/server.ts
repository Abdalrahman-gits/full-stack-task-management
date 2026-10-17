import dotEnv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotEnv.config();

// 1) Connecting to DB
const { DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

// Checks if .env vars are undefined
if (!DATABASE || !DATABASE_USERNAME || !DATABASE_PASSWORD)
  throw new Error("Missing environment variables");

const DBURI: string = DATABASE.replace("<USERNAME>", DATABASE_USERNAME).replace(
  "<PASSWORD>",
  DATABASE_PASSWORD,
);

mongoose
  .connect(DBURI)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB Failed to connect, ERR: ", err);
  });

// 2) Backend server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is listening");
});
