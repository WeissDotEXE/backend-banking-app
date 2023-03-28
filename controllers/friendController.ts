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

const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: { friendId } } },
      { new: true }
    );
    res.status(200).json({ status: "success", user });
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

export { getUserFriends, addFriend, deleteFriend };
