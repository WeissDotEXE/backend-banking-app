import mongoose from "mongoose";

const notificationModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Notification must have a senderId"],
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Notification must have a receiverId"],
    },
    message: {
        type: String,
        required: [true, "Notification must have a message"],
    },
    avatarImg: {
        type: String,
        required: [true, "Notification mush have an avatarImg"]
    },
    type: {
        type: Number,
        required: [true, "Notification must have a type"]
    }
});

const Notification = mongoose.model("Notification", notificationModel);
export default Notification;
