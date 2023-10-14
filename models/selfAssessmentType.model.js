const mongoose = require("mongoose");

const assessmentQuestionSchema = new mongoose.Schema({
  questionText: String,
});

const assessmentTypeSchema = new mongoose.Schema({
  assessmentQuestions: [assessmentQuestionSchema],
});

const AssessmentType = mongoose.model("AssessmentType", assessmentTypeSchema);

module.exports = AssessmentType;
