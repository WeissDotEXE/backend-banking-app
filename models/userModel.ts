import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "User must have a fullName"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have an password"],
  },
  avatarImg: {
    type: String,
    default: "", //set default value with a local file
  },
  iban: {
    type: String,
    length: 16,
  },
  joinDate: {
    type: Date,
    default: Date.now(),
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "BankingCard" }],
});

const User = mongoose.model("User", userModel);
export default User;
