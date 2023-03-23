import express from "express";
import {
  getUserFriends,
  addFriend,
  deleteFriend,
} from "../controllers/friendController";
const router = express.Router();

router
  .route("/:userId")
  .get(getUserFriends)
  .post(addFriend)
  .delete(deleteFriend);

export default router;
