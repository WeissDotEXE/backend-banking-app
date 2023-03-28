import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
const existingFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    // Check if the friend already exists in the user's friends array
    const user = await User.findOne({
      _id: userId,
      friends: { $elemMatch: { friendId } },
    });
    if (user) {
      return res
        .status(400)
        .json({ status: "fail", message: "Friend already added" });
    } else {
      // If friend does not exist, proceed to next middleware or route handler
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default existingFriend;
