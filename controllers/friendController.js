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
exports.deleteFriend = exports.acceptFriendRequest = exports.sendFriendRequest = exports.getUserFriends = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
const friendModel_1 = __importDefault(require("../models/friendModel"));
const friendEnum_1 = __importDefault(require("../enums/friendEnum"));
const notificationEnum_1 = __importDefault(require("../enums/notificationEnum"));
const getUserFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const friendsList = yield friendModel_1.default.find({
            $or: [{ requesterId: userId }, { recipientId: userId }],
            status: 2
        }).populate("recipientId requesterId");
        res.status(200).json({ status: "success", data: friendsList });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
        console.log(error);
    }
});
exports.getUserFriends = getUserFriends;
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { friendId } = req.body;
        //query for adding friend to Friends Document
        const newFriend = yield friendModel_1.default.create({
            requesterId: userId,
            recipientId: friendId,
            status: friendEnum_1.default.requested,
        });
        const senderData = yield userModel_1.default.findById({ _id: userId }).select("_id fullName avatarImg");
        yield NotificationModel_1.default.create({
            friendDocumentId: yield newFriend._id,
            senderId: userId,
            receiverId: friendId,
            message: `${senderData.fullName} wants you to be friend.`,
            type: notificationEnum_1.default.friendRequest
        });
        res.status(200).json({
            status: "success",
            message: `Friend request sent successfully}`,
            newFriend,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.sendFriendRequest = sendFriendRequest;
/*
WARNING be careful who accepts it
because both users can do it for now
*/
//only recipient user can accept friend request
const acceptFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId } = req.body;
        const { recipientId } = req.params;
        yield friendModel_1.default.updateOne({ recipientId, requesterId }, {
            $set: {
                status: friendEnum_1.default.friends
            }
        });
        console.log(requesterId, recipientId);
        res
            .status(200)
            .json({ status: "success", message: "Friend request accepted" });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.acceptFriendRequest = acceptFriendRequest;
//this request delete users in both lists (receiver & sender)
const deleteFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId } = req.params;
        yield friendModel_1.default.findByIdAndDelete({ _id: documentId });
        res.status(204).json({
            status: "success",
            message: `User has been deleted  from friends list`,
        });
    }
    catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
});
exports.deleteFriend = deleteFriend;
