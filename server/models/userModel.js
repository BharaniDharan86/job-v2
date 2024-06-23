import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Gender should be eithe Male or Female",
      },
    },
    otp: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (userPassword, dbPassword) {
  return await bcrypt.compare(userPassword, dbPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
