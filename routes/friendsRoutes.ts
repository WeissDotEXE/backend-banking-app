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
    existingFriend,
    sendFriendRequest
);
router
    .route("/acceptFriendRequest/:userId/:notificationId")
    .patch(protect, acceptFriendRequest);

router.route("/getFriends/:userId").get(protect, getUserFriends);
router.route("/deleteFriend/:documentId").delete(protect, deleteFriend);
export default router;
