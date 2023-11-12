const mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema(
  {
    Questions: String,
    Answers: String,
  },
  {
    timestamps: true,
  }
);

const Qna = mongoose.model("Qna", qnaSchema);

module.exports = Qna;
