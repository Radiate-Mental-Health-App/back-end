const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseTitle: String,
  courseDescription: String,
  courseContent: String,
  publishedDate: Date,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
