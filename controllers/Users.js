import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import { sendCookies } from "../middlewares/Cookie.js";
import { ErrorHandler } from "../middlewares/ErrorHandler.js";

export const Register = async (req, res) => {
  const { name, email, password, pic } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      ErrorHandler(res, 400, "User Already Exists");
      return;
    }

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
      ErrorHandler(res, 403, "User Doesn't Exists");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      ErrorHandler(res, 401, "Invalid Email or Password");
      return;
    }

    user = await User.findById(user._id);
    user = await User.populate(user, {
      path: "wishlist",
    });
    user = await User.populate(user, {
      path: "cart",
    });

    sendCookies(req, res, user, `Welcome Back ${user.name}`, 200);
    
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
      ErrorHandler(re, 401, "Unauthorized");
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
      ErrorHandler(res, 400, "User Not Found");
      return;
    }
    sendCookies(req, res, updatedUser, "Profile Updated Succesfully", 200);
  } catch (error) {
    console.log(error.message);
    ErrorHandler(res, 500, "Some Internal Server Error");
    return;
  }
};
