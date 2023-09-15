import Express from "express";
import {
  addToWishList,
  extra,
  getitems,
  removeitem,
} from "../controllers/Wishlist.js";
import { IsAuthenticated } from "../middlewares/Auth.js";
const router = Express.Router();

router
  .route("/")
  .get(IsAuthenticated, getitems)
  .post(IsAuthenticated, addToWishList);
router.delete("/:id", IsAuthenticated, removeitem);
router.get("/extra", extra);

export default router;
