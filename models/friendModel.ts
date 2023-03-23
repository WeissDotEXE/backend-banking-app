import mongoose, { Schema } from "mongoose";

interface FriendDocument extends Document {
  id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  avatarImage: string;
  email: String;
}

const friendsSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "Users" },
    recipient: { type: Schema.Types.ObjectId, ref: "Users" },
    status: {
      type: Number,
      enums: [
        0, //'add friend',
        1, //'requested',
        2, //'pending',
        3, //'friends'
      ],
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model<FriendDocument>("Friend", friendsSchema);
export default Friend;
