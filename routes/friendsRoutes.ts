import express from "express";
import {
  getUserFriends,
  sendFriendRequest,
  deleteFriend,
  acceptFriendRequest,
} from "../controllers/friendController";
import existingFriend from "../middleware/existingFriend";

const router = express.Router();

//patch schimba doar unde-i nevoie
//put schimba tot ( trebuie dati toti parametrii in body)

router
  .route("/sendFriendRequest/:userId")
  .patch(existingFriend, sendFriendRequest);
router.route("/acceptFriendRequest/:userId").put(acceptFriendRequest);

router.route("/getFriends/:userId").get(getUserFriends);
router.route("/deleteFriend/:userId").delete(deleteFriend);
export default router;
