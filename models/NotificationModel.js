"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationModel = new mongoose_1.default.Schema({
    friendDocumentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Friend"
    },
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Notification must have a senderId"],
        ref: "User"
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Notification must have a receiverId"],
        ref: "User"
    },
    message: {
        type: String,
        required: [true, "Notification must have a message"],
    },
    type: {
        type: Number,
        required: [true, "Notification must have a type"]
    }
});
const Notification = mongoose_1.default.model("Notification", notificationModel);
exports.default = Notification;
