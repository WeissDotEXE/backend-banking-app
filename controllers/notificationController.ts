import {Request, Response} from "express";
import Notification from "../models/NotificationModel";
import User from "../models/userModel";
import mongoose from "mongoose";

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
        const notifications = await User.findById(userId).select("notifications");
        res.status(200).json({status: "success", data: notifications});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

//success
const deleteOneNotification = async (req: Request, res: Response) => {
    try {
        const {userId, notificationId} = req.params;
        const deletedNotification = await User.findByIdAndUpdate(
            {
                _id: userId,
                notifications: {$elemMatch: {_id: notificationId}},
            },
            {$pull: {notifications: {_id: notificationId}}}
        );
        res.status(204).json({message: "succes", data: deletedNotification});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

const deleteAllNotifications = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const deletedNotifications = await User.findByIdAndUpdate(userId, {
            $pull: {notifications: {}},
        });
        res.status(204).json({status: "success", deletedNotifications});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

export {
    createNotification,
    getAllNotifications,
    deleteOneNotification,
    deleteAllNotifications,
};
