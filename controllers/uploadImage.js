"use strict";
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
exports.upload = exports.uploadImage = void 0;
const imageModel_1 = __importDefault(require("../models/imageModel"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
let fileName = null;
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        fileName = `${file.fieldname}-${Date.now()}.${extension}`;
        cb(null, fileName);
    },
});
//@ts-ignore
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb("Not an Image", false);
    }
};
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const obj = new imageModel_1.default({
            name: fileName,
            description,
            img: {
                // @ts-ignore
                data: fs_1.default.readFileSync(path_1.default.join("uploads/" + req.file.filename)),
                contentType: "image/png",
            },
        });
        const response = yield imageModel_1.default.create(obj);
        res.status(200).json({ status: "success", data: response });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.uploadImage = uploadImage;
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.upload = upload;
