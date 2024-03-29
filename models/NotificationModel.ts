import mongoose from "mongoose";

const notificationModel = new mongoose.Schema({
    friendDocumentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend"
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Notification must have a senderId"],
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Notification must have a receiverId"],
        ref: "User"
    },
    message: {
        type: String,
        required: [true, "Notification must have a message"],
    },
    type: {
        type: Number,
        required: [true, "Notification must have a type"]
    }
});

const Notification = mongoose.model("Notification", notificationModel);
export default Notification;
