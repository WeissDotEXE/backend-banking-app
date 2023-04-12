import mongoose, { Schema } from "mongoose";

interface FriendDocument extends Document {
  id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  avatarImage: string;
  email: String;
}

const friendsSchema = new Schema(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Friend must have a requesterId"],
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Friend must have a recipientId"],
    },
    status: {
      type: Number,
      enums: [
        0, //'add friend',
        1, //'requested',
        2, //'pending',
        3, //'friends'
      ],
      required: [true, "Friend must have a status"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model<FriendDocument>("Friend", friendsSchema);
export default Friend;
