import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "User must have an username"],
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
});

const User = mongoose.model("User", userModel);
export default User;
