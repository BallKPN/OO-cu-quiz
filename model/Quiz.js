const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
  choiceText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  choices: [choiceSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;