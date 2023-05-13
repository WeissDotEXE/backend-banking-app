import express from "express";

import {protect} from "../controllers/authController";
import {getUsersByName} from "../controllers/seachUsersController";

const router = express.Router();

router.route("/").get(protect, getUsersByName);

export default router;