"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)
router.route("/:userId").get(authController_1.protect, transactionController_1.getTransactions);
router.route("/").post(authController_1.protect, transactionController_1.sendTransaction);
exports.default = router;
