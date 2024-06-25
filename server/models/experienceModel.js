import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Experience must have title"],
  },
  company: {
    type: String,
    required: [true, "Experience must have company"],
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  type: {
    type: String,
    required: [true, "Experience must have type"],
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
