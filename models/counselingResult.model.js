const mongoose = require("mongoose");

const counselingResultSchema = new mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Psychologist", // Reference to the Psychologist collection
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Reference to the User collection
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Schedule", // Reference to the Schedule collection
  },
  observationResult: {
    type: String,
    required: true,
  },
  interviewResult: {
    type: String,
    required: true,
  },
  personalityDynamics: {
    type: String,
    required: true,
  },
  problems: {
  },
  solutionAndAssignment: {
    type: String,
    required: true,
  },
  conclusion: {
    type: String,
    required: true,
  },
});

const CounselingResult = mongoose.model("CounselingResult", counselingResultSchema);

module.exports = CounselingResult;
