import express from "express";
import {
  getTransactions,
  sendTransaction,
} from "../controllers/transactionController";

const router = express.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)

router.route("/:userId").get(getTransactions);
router.route("/").post(sendTransaction);
export default router;
