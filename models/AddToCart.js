import mongoose, { Schema } from "mongoose";

const AddToCart = new Schema(
  {
    game_id: {
      type: String,
      requred: true,
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
  },
  { timestamps: true }
);
const AddTocart = mongoose.model("Cart", AddToCart);

export default AddTocart;
