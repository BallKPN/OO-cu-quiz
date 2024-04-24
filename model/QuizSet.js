const mongoose = require("mongoose");

const quizSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  endDate: Date,
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  answerSet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

const QuizSet = mongoose.model("QuizSet", quizSetSchema);
module.exports = QuizSet;
