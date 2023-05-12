import {Request, Response} from "express";
import Notification from "../models/NotificationModel";
import User from "../models/userModel";
import mongoose from "mongoose";
import Friend from "../models/friendModel";

//success
const createNotification = async (
    friendId: mongoose.Schema.Types.ObjectId,
    senderId: mongoose.Schema.Types.ObjectId,
    message: String,
    avatarImg: String,
    type: Number
) => {
    try {
        const newNotification = await User.findByIdAndUpdate(
            friendId,
            {
                $push: {
                    notifications: {
                        senderId: senderId,
                        message: message,
                        avatarImg: avatarImg,
                        type: type,
                    },
                },
            },
            {new: true}
        );
        return newNotification;
    } catch (err: any) {
        console.log("error");
    }
};

//success
const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const notifications = await Notification.find({receiverId: userId}).populate("senderId")
            .select("fullName avatarImg _id message type friendDocumentId");
        res.status(200).json({status: "success", data: notifications});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

//success
const deleteOneNotification = async (req: Request, res: Response) => {
    try {
        const {notificationId} = req.params;
        const deletedNotification = await Notification.findByIdAndDelete({_id: notificationId})
        res.status(204).json({message: "succes", data: deletedNotification});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

//success
const deleteAllNotifications = async (req: Request, res: Response) => {
    try {
        const {receiverId} = req.params;
        const deletedNotifications = await Notification.deleteMany({receiverId})
        res.status(204).json({status: "success", deletedNotifications});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

const declineFriendRequestNotification = async (req: Request, res: Response) => {
    try {
        const {friendDocumentId, notificationId} = req.body;

        await Friend.findByIdAndDelete({_id: friendDocumentId});

        //delete notification after deleting friendRequest
        await Notification.findByIdAndDelete({_id: notificationId});
        res.status(204).json({status: "succes", message: "Friend request declined"})

    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

export {
    createNotification,
    getAllNotifications,
    deleteOneNotification,
    deleteAllNotifications,
    declineFriendRequestNotification
};
