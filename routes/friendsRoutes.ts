import express from "express";
import {
    getUserFriends,
    sendFriendRequest,
    deleteFriend,
    acceptFriendRequest,
} from "../controllers/friendController";
import existingFriend from "../middleware/existingFriend";
import {protect} from "../controllers/authController";

const router = express.Router();

//patch schimba doar unde-i nevoie
//put schimba tot ( trebuie dati toti parametrii in body)

router.route("/sendFriendRequest/:userId").patch(
    protect,
    //todo uncomment and resolver this middleware
    //for checking in friend document
    // existingFriend,
    sendFriendRequest
);
router
    .route("/acceptFriendRequest/:userId")
    .patch(protect, acceptFriendRequest);

router.route("/getFriends/:userId").get(protect, getUserFriends);
router.route("/deleteFriend/:userId").delete(protect, deleteFriend);
export default router;
