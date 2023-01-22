import express from "express";
import {
  getBankingCards,
  createBankingCard,
  deleteBankingCard,
} from "../controllers/bankingCardController";

const router = express.Router();

//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)
router.route("/:userId").get(getBankingCards);
router.route("/createCard").post(createBankingCard);
router.route("/deleteCard/:id").delete(deleteBankingCard);
export default router;
