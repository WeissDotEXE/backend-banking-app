import mongoose from "mongoose";
import generateRandomCVV from "../utils/generateRandomCVV";
import generateRandomCardNumber from "../utils/generateRandomCardNumber";
import generateCardExpireDate from "../utils/generateCardExpireDate";

const bankingCardModel = new mongoose.Schema({
    cardNumber: {
        type: Number,
        length: 16,
        unique: true,
        default: generateRandomCardNumber
    },
    expireDate: {
        type: Date,
        required: [true, "Banking card must have an expire Date"],
        default: generateCardExpireDate
    },
    cvv: {
        type: Number,
        length: 3,
        default: generateRandomCVV
    },
    type: {
        type: Number,
        required: [true, "Banking app must have a type"],
    },
    color: {
        type: Number,
        required: [true, "Banking app must have a payment color"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        selected: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Banking app must have an userId"],
    },
});

const BankingCard = mongoose.model("BankingCard", bankingCardModel);
export default BankingCard;
