"use strict";
//everything related to server in this file
//starting file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
//read the config.env file
dotenv_1.default.config({ path: "./config.env" });
const app_1 = __importDefault(require("./app"));
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB, (err) => {
    if (err)
        throw err;
    console.log("Connected to MongoDB!!!");
});
const port = process.env.port;
app_1.default.listen(port, () => {
    console.log(`App running on port ${port}`);
});
