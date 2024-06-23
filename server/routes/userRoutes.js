import express from "express";
import { signUp, verifyEmail } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/verifyemail").post(verifyEmail);

export default userRouter;
