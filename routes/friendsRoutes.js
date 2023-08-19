"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friendController_1 = require("../controllers/friendController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
//patch schimba doar unde-i nevoie
//put schimba tot ( trebuie dati toti parametrii in body)
//todo test existingFriend middleware
router.route("/sendFriendRequest/:userId").patch(authController_1.protect, 
// existingFriend,
friendController_1.sendFriendRequest);
router
    .route("/acceptFriendRequest/:recipientId")
    .patch(authController_1.protect, friendController_1.acceptFriendRequest);
router.route("/getFriends/:userId").get(authController_1.protect, friendController_1.getUserFriends);
router.route("/deleteFriend/:documentId").delete(authController_1.protect, friendController_1.deleteFriend);
exports.default = router;
