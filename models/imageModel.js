"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageModel = new mongoose_1.default.Schema({
    filename: { type: String, required: [true, 'file must have a filename'] },
    originalname: { type: String, required: [true, "file must have an originalname"] },
    path: String
});
const Image = mongoose_1.default.model("Image", imageModel);
exports.default = Image;
