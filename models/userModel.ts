import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "User must have a fullName"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "user must have an password"],
    minlength: 6,
  },
  repeatPassword: {
    type: String,
    required: [true, "User must have a repeatPassword"],
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

//between getting the data and saving it
userModel.pre("save", async function (next) {
  // Only run this function if password was modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete repeatPassword field
  // @ts-ignore
  this.repeatPassword = undefined;
  next();
});

const User = mongoose.model("User", userModel);
export default User;
