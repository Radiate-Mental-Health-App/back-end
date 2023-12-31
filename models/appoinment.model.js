const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
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
  package: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderTime: {
    type: Date,
    required: true,
  },
  paymentTime: {
    type: Date,
  },
  userProblem: {
    type: String
  },
  linkSession: {
    type: String
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
