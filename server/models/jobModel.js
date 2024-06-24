import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A job must have a title"],
  },
  companyName: {
    type: String,
    required: [true, "A job must have a company name"],
  },
  location: {
    type: String,
    required: [true, "A job must have a location"],
  },
  salary: {
    type: String,
    required: [true, "A job must have a salary"],
  },
  type: {
    type: String,
    required: [true, "A job must have a type"],
  },
  datePosted: {
    type: String,
    required: [true, "A job must have a posted date"],
  },
  jobDescription: {
    type: String,
    required: [true, "A job must have a description"],
    minLength: [30, "A description must be atleast 30 characters"],
  },
  experienceLevel: {
    type: String,
    enum: [
      "Internship",
      "Associate",
      "Entry Level",
      "Mid-Senior level",
      "Senior",
      "Lead",
      "Executive",
    ],
  },
  skills: {
    type: Array,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  jobApplicant: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;

