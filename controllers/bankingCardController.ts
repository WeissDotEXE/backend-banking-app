import BankingCard from "../models/bankingCardModel";
import AppError from "../utils/appError";
import { NextFunction, Response, Request } from "express";

// to-do
//1. make sure User is in database by using User.find(id) - id is in body
// first thing in getBankingCards Controller

const getBankingCards = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const bankingCards = await BankingCard.find({ userId });
    if (bankingCards.length === 0)
      return res
        .status(200)
        .json({ status: "succes", message: "This user has 0 banking cards" });
    res.status(200).json({ status: "succes", data: bankingCards });
  } catch (error) {
    res.send(400).json({ status: "fail", message: error });
  }
};

//success
const createBankingCard = async (req: Request, res: Response) => {
  try {
    const newBankingCard = await BankingCard.create(req.body);
    res.status(201).json({
      status: "succes",
      data: {
        bankingCard: newBankingCard,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: err.status,
      message: err.message,
    });
  }
};

//succes
const deleteBankingCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deletedBankingCard = await BankingCard.findByIdAndDelete(req.params.id);
  try {
    if (!deletedBankingCard) {
      return next(new AppError("No banking card found with that id", 404));
    }
    res.status(204).json({ status: "succes" });
  } catch (error: any) {
    res.status(400).json({
      status: error.status,
      message: error.message,
    });
  }
};
export { getBankingCards, createBankingCard, deleteBankingCard };
