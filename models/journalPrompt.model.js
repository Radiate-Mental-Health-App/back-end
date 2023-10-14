const mongoose = require("mongoose");

const questionPromptSchema = new mongoose.Schema({
  question: String, // The question text
});

const JournalPromptSchema = new mongoose.Schema({
  questionPrompts: [questionPromptSchema], // An array of question prompts
});

const JournalPrompt = mongoose.model("JournalPrompt", JournalPromptSchema);

module.exports = JournalPrompt;
