import express from "express";
import { signup } from "../controllers/authController";

const router = express.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)

router.post("/signup", signup);

export default router;
