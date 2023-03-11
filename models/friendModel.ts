import mongoose from "mongoose";

interface FriendDocument extends Document {
  id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  avatarImage: string;
}

const friendSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Friend must have a fullName"],
  },
  avatarImage: {
    type: String,
    required: [true, "Friend must have an avatarImage"],
  },
});

const Friend = mongoose.model<FriendDocument>("Friend", friendSchema);
export default Friend;
