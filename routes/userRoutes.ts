import express from "express";
import { login, signup } from "../controllers/authController";
import User from "../models/userModel";

const router = express.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)

router.post("/signup", signup);
router.post("/login", login);

export default router;
