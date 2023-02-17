import mongoose from "mongoose";

const notificationModel = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Notification must have a message"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Notification must have a userId"],
  },
  avatarUrl: {
    type: String,
    required: [true, "Notification must have avatarUrl"],
  },
});

const Notification = mongoose.model("Notification", notificationModel);
export default Notification;
