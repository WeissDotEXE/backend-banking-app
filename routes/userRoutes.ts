import express from "express";
import {forgotPassword, protect, resetPassword} from "../controllers/authController";
import {
    getUserName,
    getUserData,
    getUserAccounts,
    getUserFriends,
    getUserTransactions,
    editProfile
} from "../controllers/userController";

const router = express.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)

router.get("/:userId", protect, getUserData);
router.get("/name/:userId", protect, getUserName);
router.get("/accounts/:userId", protect, getUserAccounts);
router.get("/friends/:userId", protect, getUserFriends);
router.get("/transactions/:userId", protect, getUserTransactions);
router.patch("/editprofile/:userId", protect, editProfile)

router.post("/forgotPassword", forgotPassword);
router.patch('/resetPassword/:token', resetPassword)

export default router;
