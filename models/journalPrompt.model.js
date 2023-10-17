const mongoose = require("mongoose");

const JournalPromptSchema = new mongoose.Schema({
  question: String,
});

const JournalPrompt = mongoose.model("JournalPrompt", JournalPromptSchema);

module.exports = JournalPrompt;
