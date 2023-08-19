"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const imageModel_1 = __importDefault(require("../models/imageModel"));
const router = express_1.default.Router();
// router.route("/").post(upload.single("image"), uploadImage)
const storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.route('/upload').post(authController_1.protect, upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = new imageModel_1.default({
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: `/uploads/${req.file.filename}`, // Adding the path here
        });
        const response = yield image.save();
        res.status(200).json({ status: "success", data: response });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
}));
router.route("/get/:fileId").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield imageModel_1.default.findById(req.params.fileId);
        if (image) {
            res.json({ status: "success", data: image });
        }
        else {
            res.status(404).json({ status: "fail", message: 'Image not found' });
        }
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
}));
exports.default = router;
