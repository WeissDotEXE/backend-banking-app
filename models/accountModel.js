"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountModel = new mongoose_1.default.Schema({
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
const Account = mongoose_1.default.model("Account", accountModel);
exports.default = Account;
