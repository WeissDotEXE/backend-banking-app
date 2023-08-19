"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
//add routes such as
//router.route("/route").get(getController).post(postController).delete(deleteController).patch(patchController)
router.get("/:userId", authController_1.protect, userController_1.getUserData);
router.get("/name/:userId", authController_1.protect, userController_1.getUserName);
router.get("/accounts/:userId", authController_1.protect, userController_1.getUserAccounts);
router.get("/friends/:userId", authController_1.protect, userController_1.getUserFriends);
router.get("/transactions/:userId", authController_1.protect, userController_1.getUserTransactions);
router.patch("/editprofile/:userId", authController_1.protect, userController_1.editProfile);
router.post("/forgotPassword", authController_1.forgotPassword);
router.patch('/resetPassword/:token', authController_1.resetPassword);
exports.default = router;
