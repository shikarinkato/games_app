import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  pic: {
    type: String,
    required: true,
    default: "https://cdn150.picsart.com/upscale-245339439045212.png",
  },
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const User = mongoose.model("Users", UserSchema);

export default User;
