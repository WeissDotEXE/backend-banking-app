import express from "express";
import { protect } from "../controllers/authController";

import {
  getAllNotifications,
  deleteOneNotification,
  deleteAllNotifications,
} from "../controllers/notificationController";

const router = express.Router();
//todo create controllers
router.route("/:userId").get(protect, getAllNotifications);
router
  .route("/deleteone/:userId/:notificationId")
  .delete(protect, deleteOneNotification);
router.route("/deleteall/:userId").delete(protect, deleteAllNotifications);

export default router;
