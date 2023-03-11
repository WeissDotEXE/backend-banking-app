import express from "express";
import { body, validationResult } from "express-validator";
import { login, register } from "../controllers/authController";
const router = express.Router();

router
  .route("/register")
  .post(
    body("username").isString().isLength({ min: 5, max: 30 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    register
  );
router
  .route("/login")
  .post(body("email").isEmail(), body("password").isLength({ min: 5 }), login);

export default router;
