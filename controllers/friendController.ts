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
        const {friendId} = req.body;
        const {userId, notificationId} = req.params;

        const friend = await Friend.updateOne({recipientId: userId, requesterId: friendId}, {
            $set:
                {
                    status: friendEnum.friends
                }
        })
        console.log(friendId, userId)
        console.log(friend)

        // const acceptFriendRequestNotification = {
        //     senderId: friend?._id,
        //     message: `${friend?.fullName} has accepted your friend request`,
        //     avatarImg: friend?.avatarImg,
        //     type: 1, //'friend request accepted'
        // };
        //
        // //send notification to sender when receiver accepts the request
        // const notificationMessage = `${friend?.fullName} has accepted your friend request`;
        // if (friend) {
        //     createNotification(
        //         //@ts-ignore
        //         userId,
        //         friend?._id,
        //         notificationMessage,
        //         friend?.avatarImg,
        //         notificationEnum.acceptedFriendRequest
        //     );
        // }


        await Notification.findByIdAndDelete(notificationId);
        // todo change with correct query for notification document
        // await User.findByIdAndUpdate(
        //     {
        //       _id: userId,
        //       notifications: {$elemMatch: {_id: notificationId}},
        //     },
        //     {$pull: {notifications: {_id: notificationId}}}
        // );

        res
            .status(200)
            .json({status: "success", message: "Friend request accepted"});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

/*todo implement decline friend request controller
*  when user decline friend request from notification
*  delete friend from Friends document and notification aswell*/


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
