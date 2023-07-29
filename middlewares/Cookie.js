import jwt from "jsonwebtoken";

export const sendCookies = (req, res, user, message, statuscode = 200) => {
  const userWithoutPassword = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(
    { id: userWithoutPassword.id },
    process.env.JWT_SECRET
  );

  res
    .status(statuscode)
    .cookie("cookies", token, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user: userWithoutPassword,
    });
  req.cookies;
};