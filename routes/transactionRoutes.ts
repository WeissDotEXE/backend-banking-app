import express from "express";
import {
  getTransactions,
  sendTransaction,
} from "../controllers/transactionController";
import { protect } from "../controllers/authController";

const router = express.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)

router.route("/:userId").get(protect, getTransactions);
router.route("/").post(protect, sendTransaction);
export default router;
