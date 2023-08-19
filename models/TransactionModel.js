"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionModel = new mongoose_1.default.Schema({
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Transaction must have a receiverId"],
    },
    message: {
        type: String,
        default: null
    },
    transactionDate: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: [true, "Transaction must have an amount"],
    },
    currency: {
        type: Number,
        required: [true, "Transaction must have a currency"],
    },
    type: {
        type: Number,
        required: [true, "Transaction must have a type"]
    }
});
const Transaction = mongoose_1.default.model("Transaction", transactionModel);
exports.default = Transaction;
