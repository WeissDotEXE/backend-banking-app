import express from "express";
import {addMoney, getBankingAccounts, sendMoney} from "../controllers/bankingAccountsController";
import {protect} from "../controllers/authController";

const router = express.Router();

router.get("/:userId", protect, getBankingAccounts);
router.patch("/addMoney/:accountId", protect, addMoney);
router.patch("/sendMoney", protect, sendMoney);


export default router;
