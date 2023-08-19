"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ObjectId = mongoose_1.default.Types.ObjectId;
const validUserId = (req, res) => {
    const { userId } = req.params;
    if (exports.ObjectId.isValid(userId)) {
        if (String(new exports.ObjectId(userId)) === userId)
            return true;
        return false;
    }
    return false;
};
exports.default = validUserId;
