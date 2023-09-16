import mongoose, { Schema } from "mongoose";

const Wishlist = new Schema(
  {
    game_id: {
      type: String,
      requred: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    isAdded: {
      type:Boolean,
      required: true,
      default:false,
    },
  },
  { timestamps: true }
);
const WishList = mongoose.model("WishList", Wishlist);

export default WishList;
