import mongoose from "mongoose";

const notificationModel = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Notification must have a message"],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Notification must have a senderId"],
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "Notification must have a recipientId"],
  },
  avatarUrl: {
    type: String,
    required: [true, "Notification must have avatarUrl"],
  },
});

const Notification = mongoose.model("Notification", notificationModel);
export default Notification;
