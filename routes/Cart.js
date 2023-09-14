import Express from "express";
import { addToCart,  getCartItems, removeCartItem } from "../controllers/Cart.js";
import { IsAuthenticated } from "../middlewares/Auth.js";
const router = Express.Router();

router
  .route("/")
  .get(IsAuthenticated, getCartItems)
  .post(IsAuthenticated, addToCart);
router.delete("/:id", IsAuthenticated, removeCartItem);

export default router;
