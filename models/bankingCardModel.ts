import mongoose, { mongo } from "mongoose";

const bankingCardModel = new mongoose.Schema({
  cardNumber: {
    type: String,
    length: 16,
    unique: true,
    required: [true, "Banking card must have a number"],
  },
  expireDate: {
    type: Date,
    required: [true, "Banking card must have an expire Date"],
  },
  cvv: {
    type: Number,
    required: [true, "Banking card must have a CVV"],
    length: 3,
  },
  type: {
    type: String,
    required: [true, "Banking app must have a type"],
  },
  processing: {
    type: String,
    required: [true, "Banking app must have a payment processing"],
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
