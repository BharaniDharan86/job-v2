import express from "express";
import { signUp, verifyEmail, login } from "../controllers/authController.js";
import {
  addEducation,
  addExperience,
  readEducation,
  readExperience,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/verifyemail").post(verifyEmail);
userRouter.route("/login").post(login);

userRouter.route("/experience/:id").get(readExperience);
userRouter.route("/education/:id").get(readEducation);

userRouter.route("/addExperience/:id").post(addExperience);
userRouter.route("/addEducation/:id").post(addEducation);

export default userRouter;
