"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
//todo create controllers
router.route("/:userId").get(authController_1.protect, notificationController_1.getAllNotifications);
router
    .route("/deleteone/:notificationId")
    .delete(authController_1.protect, notificationController_1.deleteOneNotification);
router.route("/declineFriendRequest").delete(authController_1.protect, notificationController_1.declineFriendRequestNotification);
router.route("/deleteall/:receiverId").delete(authController_1.protect, notificationController_1.deleteAllNotifications);
exports.default = router;
