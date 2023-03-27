import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Friends from "../models/friendModel";

interface UserDocument extends Document {
  id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  avatarImg: string;
  iban: string;
  joinDate: number;
  role: string;
  friends: {
    friendId: mongoose.Schema.Types.ObjectId;
    status: "pending" | "accepted";
  }[];
  correctPassword(candidatePassword: string, userPassword: string): boolean;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): any;
}

const userSchema = new mongoose.Schema({
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
    //for not returning it in response
    select: false,
  },
  repeatPassword: {
    type: String,
    required: [true, "User must have a repeatPassword"],
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
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

  friends: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending",
      },
    },
  ],
});

//between getting the data and saving it
userSchema.pre("save", async function (next) {
  // Only run this function if password was modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete repeatPassword field
  // @ts-ignore
  this.repeatPassword = undefined;
  next();
});

// compare password provided by user
// with hashed password in db
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (
  JWTTimestamp: number
) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime(), 10);
    console.log(changedTimeStamp, JWTTimestamp);
    // return JWTTimestamp < changedTimeStamp;
  }

  //False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);

  //reset in 10 minutes formula
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
