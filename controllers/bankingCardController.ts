import BankingCard from "../models/bankingCardModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { NextFunction, Response, Request } from "express";

const getBankingCards = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: "test", message: "test" });
};

const createBankingCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardNumber, expireDate, cvv, type, processing, createdAt, user } =
      req.body;
    const newBankingCard = await BankingCard.create(req.body);
    res.status(201).json({
      status: "succes",
      data: {
        tour: newBankingCard,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: err.status,
      message: err.message,
    });
  }
};

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
