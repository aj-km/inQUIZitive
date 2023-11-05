const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
});

const QuizSchema = new mongoose.Schema({
  questions: [QuestionSchema],
  answers: [AnswerSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);
