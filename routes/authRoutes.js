"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router
    .route("/register")
    .post((0, express_validator_1.body)("username").isString().isLength({ min: 5, max: 30 }), (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }), authController_1.register);
router
    .route("/login")
    .post((0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }), authController_1.login);
exports.default = router;
