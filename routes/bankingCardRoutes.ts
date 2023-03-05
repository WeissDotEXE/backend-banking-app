import express from "express";
import { protect } from "../controllers/authController";
import {
  getBankingCards,
  createBankingCard,
  deleteBankingCard,
} from "../controllers/bankingCardController";

const router = express.Router();

//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)
router.route("/:userId").get(protect, getBankingCards);
router.route("/createCard").post(protect, createBankingCard);
router.route("/deleteCard/:id").delete(protect, deleteBankingCard);
export default router;
