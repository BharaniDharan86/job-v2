import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsyncError from "../utils/catchAsyncErr.js";

export const addExperience = catchAsyncError(async (req, res, next) => {
  const { id: userId } = req.params;
  console.log(userId);

  const experience = req.body;

  const user = await User.findById(userId);

  user.experiences.push(experience);

  const updatedUser = await user.save();

  console.log(updatedUser);

  if (!updatedUser)
    return next(new AppError("Something went very wrong", 400, "failed"));

  return res.status(200).json({
    status: "success",
    message: "Experience Added Successfully",
  });
});
