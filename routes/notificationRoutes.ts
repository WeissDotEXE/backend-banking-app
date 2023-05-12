import express from "express";
import {protect} from "../controllers/authController";

import {
    getAllNotifications,
    deleteOneNotification,
    deleteAllNotifications, declineFriendRequestNotification,
} from "../controllers/notificationController";

const router = express.Router();
//todo create controllers
router.route("/:userId").get(protect, getAllNotifications);
router
    .route("/deleteone/:notificationId")
    .delete(protect, deleteOneNotification);
router.route("/declineFriendRequest").delete(protect, declineFriendRequestNotification);
router.route("/deleteall/:receiverId").delete(protect, deleteAllNotifications);

export default router;
