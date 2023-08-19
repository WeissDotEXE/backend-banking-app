"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const seachUsersController_1 = require("../controllers/seachUsersController");
const router = express_1.default.Router();
router.route("/").get(authController_1.protect, seachUsersController_1.getUsersByName);
exports.default = router;
