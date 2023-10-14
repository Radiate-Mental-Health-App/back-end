const mongoose = require("mongoose");

const moodEntrySchema = new mongoose.Schema({
  moodValue: {
    type: String,
    enum: ["Terrible", "Sad", "Okay", "Good", "Wonderful"],
  },
  social: {
    type: [String],
    enum: ["Family", "Friends", "Stranger", "Relationship", "Colleagues"],
  },
  activities: [String],
  moodNote: String,
  date: Date,
});

const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);

module.exports = MoodEntry;
