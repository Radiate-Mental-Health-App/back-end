const mongoose = require("mongoose");

const psychologistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that each psychologist has a unique email
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
    ref: "Role", // Reference the Role model
    required: true,
  },
  photo: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Female", "Male"],
  },
  cityOfResidence: {
    type: String,
  },
  cityOrDistrict: {
    type: String,
  },
  whatsappNo: {
    type: String,
  },
  devicesUsed: {
    type: [String],
  },
  languagesMastered: {
    enum: ["Bahasa", "English"],
  },
  levelOfEducation: {
    type: String,
  },
  currentJob: {
    type: String,
  },
  receivedTrainingAsCounselor: {
    type: Boolean,
  },
  yearsOfExperienceAsCounselor: {
    type: Number,
  },
  expertiseFields: {
    enum: ["Career & Human Resources", "Relationship Conflict", "Mood and Emotion"],
  },
  counselingMethod: {
    enum: ["Video Call", "Voice Call", "Chat Message"],
  },
  cv: {
    type: String,
  },
  bachelorCertificate: {
    type: String,
  },
  certificates: {
    type: [String],
  },
  isActive: {
    required: true,
    type: Boolean
  }
});

const Psychologist = mongoose.model("Psychologist", psychologistSchema);

module.exports = Psychologist;
