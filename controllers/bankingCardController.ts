import BankingCard from "../models/bankingCardModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const getBankingCards = () => {};

const createBankingCard = catchAsync(async (req, res, next) => {
  const newBankingCard = await BankingCard.create(req.body);

  res.status(201).json({
    status: "succes",
    data: {
      tour: newBankingCard,
    },
  });
});

const deleteBankingCard = catchAsync(async (req, res, next) => {
  const deletedBankingCard = await BankingCard.findByIdAndDelete(req.params.id);

  if (!deletedBankingCard) {
    return next(new AppError("No banking card found with that id", 404));
  }
  res.status(204).json({ status: "succes" });
});
export { getBankingCards, createBankingCard, deleteBankingCard };
