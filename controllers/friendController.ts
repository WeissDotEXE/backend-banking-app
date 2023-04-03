import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import User from "../models/userModel";

type NotificationType = {
  message: string;
  senderId: ObjectId;
};

const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const friendsList = await User.findById(userId).select("friends");
    res.status(200).json({ status: "success", data: friendsList });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    // post request for updating friend list for sender
    const senderUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: { friendId } } },
      { new: true }
    );

    // post request for updating friend list for receiver
    const receiverUser = await User.findByIdAndUpdate(
      friendId,
      {
        $push: { friends: { friendId: userId } },
      },
      { new: true }
    );

    //patch request for pushing new notification into receiver list
    await User.findByIdAndUpdate(
      friendId,
      {
        $push: {
          notifications: {
            message: `${senderUser?.fullName} want to add you to friend list`,
            senderId:new ObjectId(userId)
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: `Friend request sent successfully to ${receiverUser!.fullName}`,
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ status: "fail", message: error });
  }
};

//WARNING be careful who accepts it
//because both users can do it for now

//TODO implement acceptFriend Request and change
// "pending" to "accepted"
const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;
    
    // Update the status of the specified friend in the user's friends array
    // for both users (receiver and sender)
     const test1=await User.updateOne(
      { _id: userId, 'friends': { $elemMatch: { id: friendId } } },
      { $set: { 'friends.$.status': "accepted" } },
      { new: true }
    );
    const test2=await User.updateOne(
      { _id: friendId, 'friends': { $elemMatch: { id: userId } } },
      { $set: { 'friends.$.status': "accepted" } },
      { new: true }
    ); 

    res.status(200).json({status:"success",test1,test2});
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

//this request delete users in both lists (receiver & sender)
const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { friendId } = req.body;
    const { userId } = req.params;

    //request for deleting user from requester friend list
    await User.findByIdAndUpdate(
      userId,
      //@ts-ignore
      { $pull: { friends: { ObjectId(friendId) } } },
      { new: true }
    );

    //request for deleting user from receiver friend list
    await User.findByIdAndUpdate(
      friendId,
      //@ts-ignore
      { $pull: { friends: { ObjectId(userId) } } },
      { new: true }
    );

    res.status(204).json({
      status: "success",
      message: `User has been deleted  from friends list`,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export { getUserFriends, sendFriendRequest, acceptFriendRequest, deleteFriend };
