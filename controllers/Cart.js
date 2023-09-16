import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import Cart from "../models/AddToCart.js";
import User from "../models/UserSchema.js";

export const addToCart = async (req, res) => {
  const { game_id, name, pic } = req.body;
  try {
    if (!game_id || !name || !pic) {
      ErrorHandler(res, 400, "All Fields Are Mandatory");
      return;
    }
    let item = await Cart.create({
      game_id,
      name,
      pic,
      user: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { cart: [item._id] },
    });

    res.status(201).json(item);
    // console.log(item, req.user);
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};

export const getCartItems = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      ErrorHandler(res, 404, "User Not Found");
    }
    let item = await user.populate("cart");
    item = item.cart;

    if (!item || item.length === 0) {
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

export const removeCartItem = async (req, res) => {
  const itemID = req.params.id;

  try {
    if (!itemID) {
      ErrorHandler(res, 400, "Id is Missing");
      return;
    }

    let user = await User.findById(req.user._id);

    if (!user) {
      ErrorHandler(res, 404, "User not Found");
      return;
    }

    let item = await Cart.findByIdAndDelete(itemID);

    if (!item) {
      ErrorHandler(res, 404, "Item Not Found");
      return;
    }
    res
      .status(200)
      .json({ item, message: "Item Deleted Successfully", success: true });
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};
