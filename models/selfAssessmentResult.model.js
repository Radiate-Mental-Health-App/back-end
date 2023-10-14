const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssessmentType.assessmentQuestions._id",
  },
  response: String,
});

const selfAssessmentResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assessmentDate: Date,
  assessmentTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssessmentType",
  },
  userResponses: [userResponseSchema],
  assessmentScore: Number,
  assessmentFeedback: String,
  consultProfessional: Boolean,
});

const SelfAssessmentResult = mongoose.model("SelfAssessmentResult", selfAssessmentResultSchema);

module.exports = SelfAssessmentResult;
