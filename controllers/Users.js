import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import { sendCookies } from "../middlewares/Cookie.js";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exits" });
    }
    const hashedpasword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedpasword });

    sendCookies(req, res, user, "Registered Succesfully", 201);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Some Internal Server Occured" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    user = await User.findById(user._id);
    sendCookies(req, res, user, `Welcome Back ${user.name}`, 200);

    console.log(req.cookies);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Some Internal Server Occured" });
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
    res
      .status(500)
      .json({ success: false, message: "Some Internal Server Occured" });
  }
};

export const GetMyProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json({ success: true, message: `Hey ${user.name}`, user });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Some Internal Server Occured" });
  }
};
