import express from "express";
import {generatePdf} from "../controllers/generatePdfController";

const router = express.Router()

router.post("/", generatePdf)

export default router
