"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.getUserBankingCards = exports.getUserTransactions = exports.getUserFriends = exports.getUserAccounts = exports.getUserData = exports.getUserName = void 0;
const TransactionModel_1 = __importDefault(require("../models/TransactionModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bankingCardModel_1 = __importDefault(require("../models/bankingCardModel"));
const getUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const data = yield userModel_1.default.findById(userId).select("fullName");
        res.status(200).json({ status: "success", data });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.getUserName = getUserName;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const data = yield userModel_1.default.findById(userId);
        res.status(200).json({ status: "success", data });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.getUserData = getUserData;
const getUserAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield userModel_1.default.findById(userId).select("accounts");
    }
    catch (error) {
    }
});
exports.getUserAccounts = getUserAccounts;
const getUserFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield userModel_1.default.findById(userId).select("friends");
    }
    catch (error) {
    }
});
exports.getUserFriends = getUserFriends;
const getUserTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield TransactionModel_1.default.find({ receiverId: userId });
        if (response.length === 0) {
            res.status(200).json({
                status: "success",
                data: response,
                message: "No transactions yet",
            });
        }
        res.status(200).json({ status: "success", data: response });
    }
    catch (error) {
    }
});
exports.getUserTransactions = getUserTransactions;
const getUserBankingCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const response = yield bankingCardModel_1.default.find({ userId });
        if (response.length === 0) {
            res.status(200).json({
                status: "success",
                data: response,
                message: "No cards yet",
            });
        }
        res.status(200).json({ status: "success", data: response });
    }
    catch (error) {
    }
});
exports.getUserBankingCards = getUserBankingCards;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { email, avatarImg, fullName } = req.body;
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { email, avatarImg, fullName }, { new: true } // Return the updated user document
        );
        if (!updatedUser) {
            return res
                .status(404)
                .json({ status: "fail", message: "User not found" });
        }
        res.status(200).json({ status: "success", message: "Profile updated" });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error });
    }
});
exports.editProfile = editProfile;
