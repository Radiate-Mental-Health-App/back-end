const mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema(
  {
    pertanyaan: String,
    response: String,
  },
  {
    timestamps: true,
  }
);

const Qna = mongoose.model("Qna", qnaSchema);

module.exports = Qna;
