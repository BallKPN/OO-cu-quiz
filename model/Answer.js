const { mongoose } = require("mongoose");

const answerSchema = new mongoose.Schema({
  quizSetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizSet",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answerer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: { type: String, required: true },
  submitDate: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;