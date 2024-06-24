import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: [true, "Education must have school or university name"],
  },
  degree: {
    type: String,
    required: [true, "Education must have degree"],
  },
  fieldOfStudy: {
    type: String,
    required: [true, "Education must have field of study"],
  },
  startDate: {
    type: Date,
  },
  endDate: {},
  grade: {},
  description: {
    type: String,
  },
});

const Education = mongoose.model("Education", educationSchema);

export default Education;
