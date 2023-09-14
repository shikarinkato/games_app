import Express from "express";
import { addToWishList, getitems, removeitem } from "../controllers/Wishlist.js";
import { IsAuthenticated } from "../middlewares/Auth.js";
const router = Express.Router();

router
  .route("/")
  .get(IsAuthenticated, getitems)
  .post(IsAuthenticated, addToWishList);
router.delete("/:id", IsAuthenticated, removeitem);

export default router;
