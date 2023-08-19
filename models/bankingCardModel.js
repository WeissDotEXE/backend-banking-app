"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const generateRandomCVV_1 = __importDefault(require("../utils/generateRandomCVV"));
const generateRandomCardNumber_1 = __importDefault(require("../utils/generateRandomCardNumber"));
const generateCardExpireDate_1 = __importDefault(require("../utils/generateCardExpireDate"));
const bankingCardSchema = new mongoose_1.Schema({
    cardNumber: {
        type: Number,
        length: 16,
        unique: true,
    },
    expireDate: {
        type: Date,
    },
    cvv: {
        type: Number,
        length: 3,
    },
    type: {
        type: Number,
        required: [true, "Banking card must have a type"],
    },
    color: {
        type: Number,
        required: [true, "Banking card must have a payment color"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Banking app must have a userId"],
        ref: "User"
    },
});
// @ts-ignore
bankingCardSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.cardNumber = (0, generateRandomCardNumber_1.default)();
        this.expireDate = (0, generateCardExpireDate_1.default)();
        this.cvv = (0, generateRandomCVV_1.default)();
        next();
    });
});
const BankingCard = mongoose_1.default.model("BankingCard", bankingCardSchema);
exports.default = BankingCard;
