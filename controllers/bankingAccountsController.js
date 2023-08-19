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
exports.sendMoney = exports.addMoney = exports.getBankingAccounts = void 0;
const bankingAccountModel_1 = __importDefault(require("../models/bankingAccountModel"));
const TransactionModel_1 = __importDefault(require("../models/TransactionModel"));
const transactionEnum_1 = __importDefault(require("../enums/transactionEnum"));
const NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
const notificationEnum_1 = __importDefault(require("../enums/notificationEnum"));
const userModel_1 = __importDefault(require("../models/userModel"));
const getBankingAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const bankingAccounts = yield bankingAccountModel_1.default.find({ userId });
        res.status(200).json({ status: "success", data: bankingAccounts });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.getBankingAccounts = getBankingAccounts;
const addMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountId } = req.params;
        const { amount, balance, receiverUserId, currency } = req.body;
        const finalBalance = balance + amount;
        // Update the balance of the banking account based on its _id
        yield bankingAccountModel_1.default.updateOne({ _id: accountId }, {
            $set: { balance: finalBalance }
        });
        // Create a new transaction record
        yield TransactionModel_1.default.create({ amount, type: transactionEnum_1.default.deposit, receiverId: receiverUserId, currency });
        res.status(200).json({ status: 'success', message: `You added ${amount} money` });
    }
    catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
});
exports.addMoney = addMoney;
const sendMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, userBalance, receiverBalance, userId, receiverId, currency, userAccountId, receiverAccountId } = req.body;
        const finalUserBalance = userBalance - amount;
        const finalReceiverBalance = receiverBalance + amount;
        console.log(userBalance, receiverBalance);
        if (userBalance < amount) {
            return res.status(400).json({
                status: "fail",
                message: "Insufficient balance"
            });
        }
        // Deduct money from the user who sends money
        const responseUpdateUser = yield bankingAccountModel_1.default.updateOne({ _id: userAccountId }, {
            $set: {
                balance: finalUserBalance
            }
        });
        // Add money to the receiver user
        const responseUpdateReceiver = yield bankingAccountModel_1.default.updateOne({ _id: receiverAccountId }, {
            $set: {
                balance: finalReceiverBalance
            }
        });
        const transaction = yield TransactionModel_1.default.create({
            amount,
            type: transactionEnum_1.default.userTransaction,
            receiverId: receiverId,
            senderId: userId,
            currency
        });
        const userData = yield userModel_1.default.findById(userId);
        const notification = yield NotificationModel_1.default.create({
            friendDocumentId: receiverId,
            senderId: userId,
            receiverId: receiverId,
            //@ts-ignore
            message: `${userData.fullName} sent you ${amount}`,
            type: notificationEnum_1.default.sendMoney
        });
        if (transaction || responseUpdateReceiver || responseUpdateUser) {
            res.status(200).json({
                status: "success",
                transaction,
                responseUpdateReceiver,
                responseUpdateUser,
                notification,
                userData
            });
        }
        else {
            res.status(400).json({ status: "fail", message: "no transaction" });
        }
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.sendMoney = sendMoney;
