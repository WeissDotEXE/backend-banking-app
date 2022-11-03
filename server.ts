//everything related to server in this file
//starting file

import dotenv from "dotenv";
//read the config.env file
dotenv.config({ path: "./config.env" });
import app from "./app";

console.log(process.env.NODE_ENV);

const port = process.env.port;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
