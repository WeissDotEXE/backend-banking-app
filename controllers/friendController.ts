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
    const friendObj = {
      id: req.body.id,
      fullName: req.body.fullName,
      avatarImage: req.body.avatarImage,
      email: req.body.email,
    };
    const response = User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: friendObj } }
    );
    console.log(response);

    res.status(201).json({
      status: "succes",
      message: `${req.body.id} has been added to your friend list`,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const deleteFriend = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export { getUserFriends, addFriend, deleteFriend };
