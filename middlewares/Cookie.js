import jwt from "jsonwebtoken";

export const sendCookies = (req, res, user, message, statuscode = 200) => {
  const userWithoutPassword = {
    id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    wishlist: user.wishlist,
    cart: user.cart,
  };
  const id = userWithoutPassword.id;

  const token = jwt.sign(
    { id: userWithoutPassword.id },
    process.env.JWT_SECRET
  );

  res
    .status(statuscode)
    .cookie("cookies", token, {
      expires: new Date(Date.now() + 30 * 86400000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
      user: userWithoutPassword,
    });
  // console.log(res.header);
  req.cookies;
};
