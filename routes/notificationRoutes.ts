import express from "express";
import { protect } from "../controllers/authController";

import {
  createNotification,
  getAllNotifications,
  deleteOneNotification,
  deleteAllNotifications,
} from "../controllers/notificationController";

const router = express.Router();
//todo create controllers
router.route("/createnotification").post(protect, createNotification);
router.route("/:userId").get(protect, getAllNotifications);
router
  .route("/deleteone/:receiverId/:notificationId")
  .delete(protect, deleteOneNotification);
router.route("/deleteall/:userId").delete(protect, deleteAllNotifications);

export default router;
