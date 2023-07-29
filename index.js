import express from "express";
import cors from "cors";
import { config } from "dotenv";
import UserRouter from "./routes/Users.js";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v3/users", UserRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Chal Gya Bc" });
});
