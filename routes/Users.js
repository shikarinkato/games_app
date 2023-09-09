import express from "express";
import {
  Login,
  Logout,
  Register,
  UpdateDetails,
} from "../controllers/Users.js";
import { IsAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", IsAuthenticated, Logout);
router.put("/updateprofile", IsAuthenticated, UpdateDetails);
export default router;
