import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/userModel";

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
      { $push: { friends: { friendId: userId } } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: `Friend request sent successfully to ${
        receiverUser!.fullName
      }. ${senderUser!.fullName}, wait for ${
        receiverUser!.fullName
      } to accept it`,
    });
  } catch (error) {
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
    const { friendId } = req.params;
    const user = await User.findByIdAndUpdate(userId);
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { friendId } = req.body;
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, {
      $pull: { friends: { friendId } },
    });
    res.status(204).json({
      status: "success",
      message: `User ${user} has been deleted from your friend list`,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export { getUserFriends, sendFriendRequest, acceptFriendRequest, deleteFriend };
