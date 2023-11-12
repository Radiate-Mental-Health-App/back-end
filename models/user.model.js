const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role", // Reference to the Role model
    required: true,
  },
  photo: String,
  gender: {
    type: String,
    enum: ["Female", "Male"],
  },
  dateOfBirth: Date,
  cityOfResidence: String,
  cityOfDistrict: String,
  whatsappNo: String,
  journalEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JournalEntry", // Reference to the JournalEntry model
    },
  ],
  moodEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MoodEntry", // Reference to the MoodEntry model
    },
  ],
  userCourseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress", // Reference to the CourseProgress model
    },
  ],
  selfAssessmentResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SelfAssessmentResult", // Reference to the SelfAssessmentResult model
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
