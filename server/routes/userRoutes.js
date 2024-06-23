import express from "express";
import { signUp } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signUp);

export default userRouter;
