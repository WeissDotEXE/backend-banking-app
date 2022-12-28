import mongoose from "mongoose";

const transactionModel = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Transaction must have a type"],
  },
  message: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now(),
    required: [true, "Transaction must have a date"],
  },
  amount: {
    type: Number,
    required: [true, "transaction must have an amount"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", transactionModel);
export default Transaction;
