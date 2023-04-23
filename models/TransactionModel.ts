import mongoose from "mongoose";

const transactionModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: String,
        required: [true, "Transaction must have a currency"],
    },
    type: {
        type: Number,
        required: [true, "Transaction must have a type"]
    }
});

const Transaction = mongoose.model("Transaction", transactionModel);
export default Transaction;
