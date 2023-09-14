import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    pic: {
      type: String,
      default: "https://cdn150.picsart.com/upscale-245339439045212.png",
    },
    date: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);

export default User;
