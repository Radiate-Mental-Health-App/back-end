const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  title: String,
  journalPrompt: { type: mongoose.Schema.Types.ObjectId, ref: "JournalPrompt" }, // Reference to the related journal prompt
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  note: String,
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = JournalEntry;
