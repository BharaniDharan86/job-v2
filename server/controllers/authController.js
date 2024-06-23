import User from "../models/userModel.js";
import catchAsyncError from "../utils/catchAsyncErr.js";
import AppError from "../utils/appError.js";
import { generateOtp } from "../utils/generators.js";

export const signUp = catchAsyncError(async (req, res, next) => {
  const { userName, password, email, gender } = req.body;

  const isUserExists = await User.findOne({
    email,
    isVerified: true,
    isActive: true,
  });

  //if the user already exists

  if (isUserExists)
    return next(
      new AppError("User with this email already exists", 404, "Failed")
    );

  const isUserNotVerified = await User.findOne({
    email,
    isVerified: false,
  });

  // if user registered but hasn't verified his account yet

  if (isUserNotVerified) {
    const otp = generateOtp();

    //sending mail to the user

    await User.findByIdAndUpdate(isUserNotVerified._id, {
      otp: otp,
    });

    return res.status(200).json({
      status: "success",
      message: "We Have sent you otp please check your mail id",
    });
  }

  const isUserNotExists = await User.findOne({ email });

  //when user first time logs in to the application

  if (!isUserNotExists) {
    const otp = generateOtp();

    //sent the mail to the user

    const newUser = await User.create({
      userName,
      password,
      email,
      gender,
      otp,
    });

    if (!newUser) {
      return next(new AppError("Something went very wrong", 400, "failed"));
    }

    return res.status(200).json({
      status: "success",
      message: "We Have sent you otp please check your mail id",
    });
  }
});
