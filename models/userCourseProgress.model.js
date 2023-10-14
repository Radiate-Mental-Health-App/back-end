const mongoose = require("mongoose");

const userCourseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  isCompleted: Boolean,
  progressPercentage: Number,
  lastAccessed: Date,
});

const UserCourseProgress = mongoose.model("UserCourseProgress", userCourseProgressSchema);

module.exports = UserCourseProgress;
