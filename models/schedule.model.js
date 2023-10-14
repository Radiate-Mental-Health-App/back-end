const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Psychologist", // Reference to the Psychologist model
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  timeSlots: [
    {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      available: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
