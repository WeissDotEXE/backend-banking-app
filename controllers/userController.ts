import { NextFunction, Request, Response } from "express";
import Transaction from "../models/TransactionModel";
import User from "../models/userModel";
import BankingCard from "../models/bankingCardModel";

const getUserName = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await User.findById(userId).select("fullName");
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const data = await User.findById(userId);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const getUserAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await User.findById(userId).select("accounts");
  } catch (error) {}
};

const getUserFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await User.findById(userId).select("friends");
  } catch (error) {}
};

const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await Transaction.find({ receiverId: userId });
    if (response.length === 0) {
      res.status(200).json({
        status: "succes",
        data: response,
        message: "No transactions yet",
      });
    }
    res.status(200).json({ status: "success", data: response });
  } catch (error) {}
};

const getUserBankingCards = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await BankingCard.find({ userId });
    if (response.length === 0) {
      res.status(200).json({
        status: "succes",
        data: response,
        message: "No cards yet",
      });
    }
    res.status(200).json({ status: "success", data: response });
  } catch (error) {}
};
export {
  getUserName,
  getUserData,
  getUserAccounts,
  getUserFriends,
  getUserTransactions,
  getUserBankingCards,
};
