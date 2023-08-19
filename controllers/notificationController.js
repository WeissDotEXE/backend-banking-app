"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.declineFriendRequestNotification = exports.deleteAllNotifications = exports.deleteOneNotification = exports.getAllNotifications = exports.createNotification = void 0;
const NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const friendModel_1 = __importDefault(require("../models/friendModel"));
//success
const createNotification = (friendId, senderId, message, avatarImg, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newNotification = yield userModel_1.default.findByIdAndUpdate(friendId, {
            $push: {
                notifications: {
                    senderId: senderId,
                    message: message,
                    avatarImg: avatarImg,
                    type: type,
                },
            },
        }, { new: true });
        return newNotification;
    }
    catch (err) {
        console.log("error");
    }
});
exports.createNotification = createNotification;
//success
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notifications = yield NotificationModel_1.default.find({ receiverId: userId }).populate("senderId")
            .select("fullName avatarImg _id message type friendDocumentId");
        res.status(200).json({ status: "success", data: notifications });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.getAllNotifications = getAllNotifications;
//success
const deleteOneNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const deletedNotification = yield NotificationModel_1.default.findByIdAndDelete({ _id: notificationId });
        res.status(204).json({ message: "succes", data: deletedNotification });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.deleteOneNotification = deleteOneNotification;
//success
const deleteAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { receiverId } = req.params;
        const deletedNotifications = yield NotificationModel_1.default.deleteMany({ receiverId });
        res.status(204).json({ status: "success", deletedNotifications });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.deleteAllNotifications = deleteAllNotifications;
const declineFriendRequestNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friendDocumentId, notificationId } = req.body;
        yield friendModel_1.default.findByIdAndDelete({ _id: friendDocumentId });
        //delete notification after deleting friendRequest
        yield NotificationModel_1.default.findByIdAndDelete({ _id: notificationId });
        res.status(204).json({ status: "succes", message: "Friend request declined" });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.declineFriendRequestNotification = declineFriendRequestNotification;
