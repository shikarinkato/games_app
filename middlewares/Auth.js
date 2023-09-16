import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import { ErrorHandler } from "./ErrorHandler.js";

export const IsAuthenticated = async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader) {
    let token = authHeader.split(" ")[1];
    try {
      const verified_token = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(verified_token.id);
      if (!user) {
        ErrorHandler(res, 400, "Token is Not Valid");
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      ErrorHandler(res, 401, "Unauthorized! Invalid Token");
    }
    if (!token) {
      ErrorHandler(res, 400, "Token is Not valid");
      return;
    }
  } else {
    res.status(401).json({
      message: "Unauthorized! Please Log in with Correct Credentials",
    });
    return;
  }
};
