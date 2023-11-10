const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Psychologist", // Reference to the Psychologist model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlots: {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
});

// Validasi menggunakan hook pre-validate
scheduleSchema.pre("validate", async function (next) {
  const existingSchedule = await this.constructor.findOne({
    psychologistId: this.psychologistId,
    day: this.day,
    "timeSlots.startTime": this.timeSlots.startTime,
    "timeSlots.endTime": this.timeSlots.endTime,
  });

  if (existingSchedule) {
    const error = new Error(
      "Data duplicate. Schedule with same timeSlots has already exist"
    );
    next(error);
  } else {
    next();
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
