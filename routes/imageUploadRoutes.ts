import express from "express";
import {protect} from "../controllers/authController";

const router = express.Router();

router.post("/upload")

export default router