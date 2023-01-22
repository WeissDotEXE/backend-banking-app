//everything related to server in this file
//starting file

import dotenv from "dotenv";
import mongoose from "mongoose";
//read the config.env file
dotenv.config({ path: "./config.env" });
import app from "./app";

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

mongoose.connect(DB, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB!!!");
});

const port = process.env.port;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
