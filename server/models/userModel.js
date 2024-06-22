import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid Email Id",
    },
  },
  password: {
    type: "String",
    required: [true, "Password is required"],
    minLength: [8, "Password must be atleast 8 characters"],
  },
  profileImage: {
    type: String,
    default: "http://tinyurl.com/careersync",
  },
  gender: {
    enum: {
      values: ["M", "F"],
      message: "Gender should be eithe Male or Female",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
