import mongoose from "mongoose";

const transactionModel = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Transaction must have a senderId"],
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Transaction must have a receiverId"],
  },
  message: {
    type: String,
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
});

const Transaction = mongoose.model("Transaction", transactionModel);
export default Transaction;
