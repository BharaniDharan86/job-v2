import User from "../models/userModel.js";
import catchAsyncError from "../utils/catchAsyncErr.js";
import AppError from "../utils/appError.js";
import { generateOtp } from "../utils/generators.js";
import { sendEmail } from "../utils/email.js";
import { createJWT } from "../utils/jwt.js";

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

    await sendEmail({
      to: email,
      userName,
      otp,
      subject: "User Registration",
    });

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

    await sendEmail({
      to: email,
      userName,
      otp,
      subject: "User Registration",
    });

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

export const verifyEmail = catchAsyncError(async (req, res, next) => {
  const { otp: userOtp, email } = req.body;

  const currentUser = await User.findOne({ email });

  const isValidOtp = currentUser.otp === userOtp;

  if (!isValidOtp)
    return next(new AppError("Entered Otp is Incorrect", 400, "Failed"));

  const token = createJWT(currentUser._id);

  res.cookie("access_token", token);

  await User.findByIdAndUpdate(currentUser._id, {
    isActive: true,
    isVerified: true,
  });

  return res.status(200).json({
    status: "success",
    success: true,
    message: "User created successfully !!!",
  });
});
