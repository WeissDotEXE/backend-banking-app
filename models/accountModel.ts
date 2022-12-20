import mongoose from "mongoose";

const accountModel = new mongoose.Schema({
  balance: {
    type: Number,
    required: [true, "Account must have a balance"],
    default: 0,
  },
  currency: {
    type: String,
    required: [true, "Accout must have a currenry"],
  },
  currencyImg: {
    type: String,
    required: [true, "Account must have a currency image"],
  },
  currencyCode: {
    type: String,
    required: [true, "Account must have currency code"],
  },
});

const Account = mongoose.model("Account", accountModel);
export default Account;
