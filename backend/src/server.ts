import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import env from "./utils/envConfig.js";

process.on("uncaughtException", (err) => {
  console.log(`uncaught exception error: ${err}`);
  process.exit(1);
});

// 1) Connecting to DB
const { DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } = env;

const DBURI = DATABASE.replace("<USERNAME>", DATABASE_USERNAME).replace(
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
    process.exit(1);
  });

// 2) Backend server
const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("server is listening");
});

process.on("unhandledRejection", (reason) => {
  console.log(`unhandled rej called reason: ${reason}`);
  server.close(() => process.exit(1));
});
