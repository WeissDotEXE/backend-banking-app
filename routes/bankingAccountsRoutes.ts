import express from "express";
import {getBankingAccounts} from "../controllers/bankingAccountsController";

import {protect} from "../controllers/authController";

const router = express.Router();

router.get("/:userId", protect, getBankingAccounts);

export default router;
