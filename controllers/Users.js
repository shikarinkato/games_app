import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import { sendCookies } from "../middlewares/Cookie.js";
import { ErrorHandler } from "../middlewares/ErrorHandler.js";

export const Register = async (req, res) => {
  const { name, email, password, pic } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exits" });
    }
    // console.log(User);
    const hashedpasword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedpasword, pic });

    sendCookies(req, res, user, "Registered Succesfully", 201);
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User Doesn't Exists",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    user = await User.findById(user._id);
    user = await User.populate(user, {
      path: "wishlist",
    });
    user,
      await User.populate(user, {
        path: "cart",
      });
    sendCookies(req, res, user, `Welcome Back ${user.name}`, 200);
    // console.log(user);

    // console.log(req.cookies);
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};

export const Logout = async (req, res) => {
  try {
    res
      .cookie("cookies", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};

export const UpdateDetails = async (req, res) => {
  const { name, email, pic } = req.body;
  // console.log(req.user._id)
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }
    const updatedData = { name, email, pic };
    const userid = req.user._id;

    let updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, {
      new: true,
    });
    // console.log(updatedData);
    // console.log(updatedUser);
    if (!updatedUser) {
      res.status(400).json({ message: "User Not Found", success: false });
    }
    sendCookies(req, res, updatedUser, "Profile Updated Succesfully", 200);
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};
