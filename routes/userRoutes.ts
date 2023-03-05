import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import User from "../models/userModel";

const router = express.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

export default router;
