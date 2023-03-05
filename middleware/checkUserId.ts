import { Request, Response } from "express";
import mongoose from "mongoose";
export type TObjectId = mongoose.ObjectId;
export const ObjectId = mongoose.Types.ObjectId;

const validUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (ObjectId.isValid(userId)) {
    if (String(new ObjectId(userId)) === userId) return true;
    return false;
  }
  return false;
};

export default validUserId;
