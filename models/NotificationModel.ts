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
});

const Notification = mongoose.model("Notification", notificationModel);
export default Notification;
