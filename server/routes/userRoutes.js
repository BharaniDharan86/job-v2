import express from "express";
import { signUp, verifyEmail, login } from "../controllers/authController.js";
import { addExperience } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/verifyemail").post(verifyEmail);
userRouter.route("/login").post(login);

userRouter.route("/addExperience/:id").post(addExperience);

export default userRouter;
