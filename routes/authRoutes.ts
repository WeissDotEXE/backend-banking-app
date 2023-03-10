import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

router
  .route("/register")
  .post(
    body("username").isString().isLength({ min: 5, max: 30 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    (req: express.Request, res: express.Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).json({ status: "success" });
    }
  );
router
  .route("/login")
  .post(
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    (req: express.Request, res: express.Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).json({ status: "success" });
    }
  );

export default router;
