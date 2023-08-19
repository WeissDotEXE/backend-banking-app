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
exports.sendTransaction = exports.getTransactions = void 0;
const TransactionModel_1 = __importDefault(require("../models/TransactionModel"));
const transactionEnum_1 = __importDefault(require("../enums/transactionEnum"));
const receiverRecipientEnum_1 = __importDefault(require("../enums/receiverRecipientEnum"));
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const transactions = yield TransactionModel_1.default.find({
            $or: [{ receiverId: userId }, { senderId: userId }],
        });
        if (transactions.length === 0) {
            return res.status(200).json({ status: 'success', message: 'No transactions' });
        }
        const updatedTransactions = transactions.map((doc) => {
            if (doc.type === transactionEnum_1.default.deposit) {
                return doc.toObject(); // Convert Mongoose document to plain JavaScript object
            }
            const fieldFound = doc.receiverId.toString() === userId.toString() ? receiverRecipientEnum_1.default.recipient : receiverRecipientEnum_1.default.receiver;
            return Object.assign(Object.assign({}, doc.toObject()), { fieldFound });
        });
        res.status(200).json({ status: 'success', data: updatedTransactions });
    }
    catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
});
exports.getTransactions = getTransactions;
const sendTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, receiverId, type, message } = req.body;
        if (senderId === receiverId)
            return res
                .status(400)
                .json({ status: "fail", message: "You can't send money to yourself" });
        //handle case for user transaction
        //a transaction from other user need senderId but deposit doesn't
        if (type === transactionEnum_1.default.userTransaction) {
            if (!senderId) {
                return res.status(400).json({
                    status: "fail",
                    message: "Transaction must have a senderId for user transaction"
                });
            }
        }
        //handle case if request does have a message for deposit transaction (it isn't needed)
        if (message && type === transactionEnum_1.default.deposit) {
            return res.status(400).json({
                status: "fail",
                message: "Transaction must not have a message if it is deposit type"
            });
        }
        const newTransaction = yield TransactionModel_1.default.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                transaction: newTransaction,
            },
        });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.sendTransaction = sendTransaction;
