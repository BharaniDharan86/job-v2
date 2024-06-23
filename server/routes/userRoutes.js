import express from "express";
import { signUp, verifyEmail, login } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/verifyemail").post(verifyEmail);
userRouter.route("/login").post(login);

export default userRouter;
