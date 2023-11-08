const Quiz = require("../models/Quiz");
const User = require("../models/User");

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendQuizToUser = async (req, res) => {
    try {
        const {  userEmail,quizTitle } = req.body;
        let user = await User.findOne({ email:userEmail });
        let quiz = await Quiz.findOne({ title:quizTitle });
        if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        if (!user.quizzes.some(quizEntry => quizEntry.quizId.equals(quiz._id))) {
          user.quizzes.push({ quizId: quiz._id, responses: [], score: 0 });
          await user.save();
          res.status(200).json({ message: 'Quiz sent to user successfully' });
        } else {
          res.status(400).json({ message: 'User already has this quiz' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Function to handle the submission of quiz responses
exports.submitQuizResponses = async (req, res) => {
  const { userId, quizId, quizResponses } = req.body; // Extract userId, quizId, and responses from the request body
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }  

    // Calculate score based on responses - this is a simple correct/incorrect count
    let score = 0;
    quizResponses.forEach(response => {
      const question = quiz.questions.id(response.questionId);
      if (question && question.answer === response.chosenOption) {
        score += 1; // Increment score for correct answers
      }
    });
  
    // Save the quiz responses and score in the user's document
    const quizAttempted = user.quizzes.find(obj => {
      return obj.quizId.toString() === quizId;
    });
    
    quizAttempted.responses = [];
    quizAttempted.score = score;
    quizAttempted.responses.push( ...quizResponses);

    await user.save();

    res.status(200).json({ message: 'Quiz responses submitted successfully', score });
  } catch (error) {
    console.error('Error submitting quiz responses:', error);
    res.status(500).json({ message: 'Error submitting quiz responses', error: error.message });
  }
};