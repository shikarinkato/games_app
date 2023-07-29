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
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const User = mongoose.model("Users", UserSchema);

export default User;
