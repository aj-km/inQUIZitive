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
  answer: {
    type:String,
    required: true,
  }
});

const QuizSchema = new mongoose.Schema({      //It is used to display questions to users
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
  duration: { // New field
    type: Number, // time in milliseconds
    required: true,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);
