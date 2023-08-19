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
exports.getUsersByName = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const friendModel_1 = __importDefault(require("../models/friendModel"));
//controller used for searching users based on name taken from req.query
const getUsersByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, id } = req.query;
        // @ts-ignore
        const regex = new RegExp(fullName, 'i');
        const users = yield userModel_1.default.find({ fullName: regex });
        const friendship = yield friendModel_1.default.findOne({
            $or: [
                { requesterId: id },
                { recipientId: id }
            ]
        }).select(`status ${'requesterId' === id ?
            "requesterId" : "recipientId"}`);
        console.log(friendship);
        res.status(200).json({ status: "succes", data: users, friendship });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
        console.log(error);
    }
});
exports.getUsersByName = getUsersByName;
