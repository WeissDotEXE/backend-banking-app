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
exports.deleteBankingCard = exports.createBankingCard = exports.getBankingCards = void 0;
const bankingCardModel_1 = __importDefault(require("../models/bankingCardModel"));
const appError_1 = __importDefault(require("../utils/appError"));
// to-do
//1. make sure User is in database by using User.find(id) - id is in body
// first thing in getBankingCards Controller
const getBankingCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const bankingCards = yield bankingCardModel_1.default.find({ userId }).populate("userId");
        if (bankingCards.length === 0)
            return res
                .status(200)
                .json({ status: "success", data: [] });
        res.status(200).json({ status: "success", data: bankingCards });
    }
    catch (error) {
        res.send(400).json({ status: "fail", message: error });
    }
});
exports.getBankingCards = getBankingCards;
//success
const createBankingCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBankingCard = yield bankingCardModel_1.default.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                bankingCard: newBankingCard,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: err.status,
            message: err.message,
        });
    }
});
exports.createBankingCard = createBankingCard;
//success
const deleteBankingCard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBankingCard = yield bankingCardModel_1.default.findByIdAndDelete(req.params.id);
    try {
        if (!deletedBankingCard) {
            return next(new appError_1.default("No banking card found with that id", 404));
        }
        res.status(204).json({ status: "success" });
    }
    catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
});
exports.deleteBankingCard = deleteBankingCard;
