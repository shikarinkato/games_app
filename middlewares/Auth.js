import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const IsAuthenticated = async (req, res, next) => {
  const { cookies } = req.cookies;
  if (!cookies) {
    return res
      .status(400)
      .json({ success: false, message: "Log in or Register First" });
  }

  const verified_token = jwt.verify(cookies, process.env.JWT_SECRET);
  const user = await User.findById(verified_token.id);
  req.user = user;
  next();
};
