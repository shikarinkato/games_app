import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import WishList from "../models/WishListSchema.js";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

export const addToWishList = async (req, res) => {
  const { game_id, name, pic } = req.body;
  try {
    if (!game_id || !name || !pic) {
      ErrorHandler(res, 400, "All Fields Are Mandatory");
      return;
    }
    let item = await WishList.findOne({ game_id });
    if (item) {
      res
        .status(200)
        .json({ item, message: "Item is Already in Wishlist", success: true });
      return;
    }
    item = await WishList.create({
      game_id,
      name,
      pic,
      user: req.user._id,
      isAdded: true,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { wishlist: [item._id] },
    });

    res
      .status(201)
      .json({ item, message: "Added To Wishlist Succesfully", success: true });
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};

export const getitems = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      ErrorHandler(res, 401, "User Not Found");
      return;
    }
    let item = await user.populate("wishlist");
    item = item.wishlist;

    if (!item || item.length === 0) {
      ErrorHandler(res, 404, "Game Not Found");
      return;
    }
    res
      .status(200)
      .json({ item, message: "Items fetched Successfully", success: true });
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};

export const removeitem = async (req, res) => {
  const itemID = req.params.id;

  try {
    if (!itemID) {
      ErrorHandler(res, 400, "Item Id is Missing");
      return;
    }

    let user = await User.findById(req.user._id);

    if (!user) {
      ErrorHandler(res, 404, "User not Found");
      return;
    }

    let item = await WishList.findByIdAndDelete(itemID);

    if (!item) {
      ErrorHandler(res, 404, "Game Not Found");
      return;
    }
    res.status(200).json({ item });
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};
