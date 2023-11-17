const mongoose = require("mongoose");

const moodEntrySchema = new mongoose.Schema({
  moodValue: {
    type: String,
  },
  social: {
    type: [String],
  },
  activities: [String],
  moodNote: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

moodEntrySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);

module.exports = MoodEntry;
