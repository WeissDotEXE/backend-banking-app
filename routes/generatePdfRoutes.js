"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generatePdfController_1 = require("../controllers/generatePdfController");
const router = express_1.default.Router();
router.post("/", generatePdfController_1.generatePdf);
exports.default = router;
