import express from "express";

import {
  createNotification,
  getAllNotifications,
  deleteOneNotification,
  deleteAllNotifications,
} from "../controllers/notificationController";

const router = express.Router();
//todo create controllers
router.route("/createnotification").post(createNotification);
router.route("/:userId").get(getAllNotifications);
router
  .route("/deleteone/:receiverId/:notificationId")
  .delete(deleteOneNotification);
router.route("/deleteall/:userId").delete(deleteAllNotifications);

export default router;
