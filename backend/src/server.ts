import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import env from "./utils/envConfig.js";

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
  });

// 2) Backend server
const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is listening");
});
