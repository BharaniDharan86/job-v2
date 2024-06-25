import moment from "moment";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsyncError from "../utils/catchAsyncErr.js";

export const addExperience = catchAsyncError(async (req, res, next) => {
  const { id: userId } = req.params;

  const experience = req.body;

  experience.startDate = moment(
    experience.startDate,
    "DD-MM-YYYY"
  ).toISOString();

  experience.endDate = moment(experience.endDate, "DD-MM-YYYY").toISOString();

  const user = await User.findById(userId);

  user.experiences.push(experience);

  const updatedUser = await user.save();

  if (!updatedUser)
    return next(new AppError("Something went very wrong", 400, "failed"));

  return res.status(200).json({
    status: "success",
    message: "Experience Added Successfully",
  });
});

export const addEducation = catchAsyncError(async (req, res, next) => {
  const { id: userId } = req.params;

  const education = req.body;

  if (!userId || !education)
    return next(
      new AppError("Please provide the user id and respective education", 400)
    );

  education.startDate = moment(education.startDate, "DD-MM-YYYY").toISOString();

  education.endDate = moment(education.endDate, "DD-MM-YYYY").toISOString();

  const user = await User.findById(userId);

  if (!user) return next(new AppError("User doesn't exists", 404));

  const updatedEducation = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        education: education,
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedEducation)
    return next(
      new AppError("Something went wrong while updating the user", 400)
    );

  return res.status(200).json({
    status: "success",
    success: true,
    message: "Education added successfully",
  });
});

export const readExperience = catchAsyncError(async (req, res, next) => {
  const { id: userId } = req.params;

  if (!userId) return next(new AppError("Please provide the user id ", 400));

  const experiences = await User.findById(userId).select("experiences email");

  return res.status(200).json({
    status: "success",
    message: "Experience retrived successfully",
    data: experiences,
  });
});

export const readEducation = catchAsyncError(async (req, res, next) => {
  const { id: userId } = req.params;
  if (!userId) return next(new AppError("Please provide the user id ", 400));

  const education = await User.findById(userId).select("education email");

  return res.status(200).json({
    status: "success",
    message: "Experience retrived successfully",
    data: education,
  });
});
