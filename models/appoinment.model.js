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
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Schedule", // Reference to the Schedule collection
  },
  package: {
    type: [String],
    required: true,
    enum: ["Video Call", "Voice Call", "Chat Message"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Waiting for Payment", "Scheduled", "In Progress", "Completed", "Expired", "Canceled"],
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
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
