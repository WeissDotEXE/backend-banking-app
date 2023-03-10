import Transaction from "../models/TransactionModel";
import { NextFunction, Response, Request } from "express";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ receiverId: userId });
    if (transactions.length === 0) {
      return res
        .status(200)
        .json({ status: "success", message: "No transactions" });
    }
    res.status(200).json({ status: "success", data: transactions });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const sendTransaction = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.body;
    if (senderId === receiverId)
      return res
        .status(400)
        .json({ status: "fail", message: "You can't send money to yourself" });
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        transaction: newTransaction,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export { getTransactions, sendTransaction };
