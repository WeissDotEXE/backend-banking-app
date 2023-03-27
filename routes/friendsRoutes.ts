import express from "express";
import {
  getUserFriends,
  addFriend,
  deleteFriend,
} from "../controllers/friendController";
import existingFriend from "../middleware/existingFriend";

const router = express.Router();

router
  .route("/:userId")
  .get(getUserFriends)
  .post(existingFriend, addFriend)
  .delete(deleteFriend);

export default router;
