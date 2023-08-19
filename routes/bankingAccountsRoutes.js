"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bankingAccountsController_1 = require("../controllers/bankingAccountsController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.get("/:userId", authController_1.protect, bankingAccountsController_1.getBankingAccounts);
router.patch("/addMoney/:accountId", authController_1.protect, bankingAccountsController_1.addMoney);
router.patch("/sendMoney", authController_1.protect, bankingAccountsController_1.sendMoney);
exports.default = router;
