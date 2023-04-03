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
    const { friendId} = req.body;

    //1. luam informatiile de la cel care trimite 
    const sender=await User.findById(userId,"_id fullName email avatarImg")
    //2. luam informatiile de la cel care primeste
    const receiver=await User.findById(friendId,"_id fullName email avatarImg")
    console.log(sender,receiver);
    
    // post request for updating friend list for sender
    await User.findByIdAndUpdate(
      userId,
      //3.bagam datele in request
      { $push: { friends:  receiver } },
      { new: true }
    );
    
    // post request for updating friend list for receiver
    await User.findByIdAndUpdate(
      friendId,
      {
        //4. bagam datele in request
        $push: { friends: sender },
      },
      { new: true }
    );

    //patch request for pushing new notification into receiver list
    await User.findByIdAndUpdate(
      friendId,
      {
        $push: {
          notifications: {
            message: `${sender?.fullName} want to add you to friend list`,
            sender:sender
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: `Friend request sent successfully to ${receiver!.fullName}`,
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
