const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseTitle:{
    type: String,
    required: true,
    unique: true
  },
  courseDescription: {
    type: String,
    required: true
  },
  courseContent: {
    type: Array,
    required: false   
  },
  categories: {
    type: Array,
    required: false   
  },
  publishedDate: {
    type: Date
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
