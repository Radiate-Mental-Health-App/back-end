const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  title: String,
  journalPrompt: { type: mongoose.Schema.Types.ObjectId, ref: "JournalPrompt.questionPrompts._id" }, // Reference to the related journal prompt
  date: Date,
  note: String,
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = JournalEntry;
