import {Request, Response} from "express";
import User from "../models/userModel";
import Notification from "../models/NotificationModel";
import Friend from "../models/friendModel";
import friendEnum from "../enums/friendEnum";
import notificationEnum from "../enums/notificationEnum";

const getUserFriends = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const friendsList = await Friend.find({
            $or: [{requesterId: userId}, {recipientId: userId}],
            status: 2
        }).populate("recipientId requesterId");


        res.status(200).json({status: "success", data: friendsList});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
        console.log(error);
    }
};

const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {friendId} = req.body;

        //query for adding friend to Friends Document
        const newFriend = await Friend.create({
            requesterId: userId,
            recipientId: friendId,
            status: friendEnum.requested,
        });

        const senderData = await User.findById({_id: userId}).select("_id fullName avatarImg");

        await Notification.create({
            friendDocumentId: await newFriend._id,
            senderId: userId,
            receiverId: friendId,
            message: `${senderData!.fullName} wants you to be friend.`,
            type: notificationEnum.friendRequest
        })

        res.status(200).json({
            status: "success",
            message: `Friend request sent successfully}`,
            newFriend,

        });
    } catch (error) {
        console.log(error);

        res.status(400).json({status: "fail", message: error});
    }
};

/*
WARNING be careful who accepts it
because both users can do it for now
*/

//only recipient user can accept friend request
const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        const {requesterId} = req.body;
        const {recipientId} = req.params;

        await Friend.updateOne({recipientId, requesterId}, {
            $set:
                {
                    status: friendEnum.friends
                }
        })
        console.log(requesterId, recipientId)

        res
            .status(200)
            .json({status: "success", message: "Friend request accepted"});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

//this request delete users in both lists (receiver & sender)
const deleteFriend = async (req: Request, res: Response) => {
    try {
        const {documentId} = req.params;
        await Friend.findByIdAndDelete({_id: documentId});

        res.status(204).json({
            status: "success",
            message: `User has been deleted  from friends list`,
        });
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

export {getUserFriends, sendFriendRequest, acceptFriendRequest, deleteFriend};
