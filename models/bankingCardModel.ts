import mongoose, {Document, Schema} from "mongoose";
import generateRandomCVV from "../utils/generateRandomCVV";
import generateRandomCardNumber from "../utils/generateRandomCardNumber";
import generateCardExpireDate from "../utils/generateCardExpireDate";
import {NextFunction} from "express";

interface IBankingCard extends Document {
    cardNumber: number;
    expireDate: Date;
    cvv: number;
    type: number;
    color: number;
    createdAt: Date;
    userId: mongoose.Types.ObjectId;
}

const bankingCardSchema = new Schema<IBankingCard>({
    cardNumber: {
        type: Number,
        length: 16,
        unique: true,
    },
    expireDate: {
        type: Date,
    },
    cvv: {
        type: Number,
        length: 3,
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
        select: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Banking app must have a userId"],
    },
});

// @ts-ignore
bankingCardSchema.pre<IBankingCard>('save', async function (next: NextFunction) {
    this.cardNumber = generateRandomCardNumber();
    this.expireDate = generateCardExpireDate();
    this.cvv = generateRandomCVV();
    next();
});

const BankingCard = mongoose.model<IBankingCard>("BankingCard", bankingCardSchema);

export default BankingCard;
