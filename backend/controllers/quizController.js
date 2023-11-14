const Quiz = require("../models/Quiz");
const User = require("../models/User");
const Group = require("../models/Group");

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.sendQuizToUser = async (req, res) => {
//     try {
//         const {  userEmail,quizTitle } = req.body;
//         let user = await User.findOne({ email:userEmail });
//         let quiz = await Quiz.findOne({ title:quizTitle });
//         if (!quiz) {
//           return res.status(404).json({ message: 'Quiz not found' });
//         }
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
        
//         if (!user.quizzes.some(quizEntry => quizEntry.quizId.equals(quiz._id))) {
//           user.quizzes.push({ quizId: quiz._id, responses: [], score: 0 });
//           await user.save();
//           res.status(200).json({ message: 'Quiz sent to user successfully' });
//         } else {
//           res.status(400).json({ message: 'User already has this quiz' });
//         }
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// };

//Version 2.0
exports.sendQuizToUser = async (req, res) => {
  try {
    const { userEmail, quizTitle} = req.body;

    // Simple validation, you can customize it based on your needs
    if (!userEmail || !quizTitle ) {
      return res.status(400).json({ message: 'Invalid request parameters' });
    }

    let user = await User.findOne({ email: userEmail });
    let quiz = await Quiz.findOne({ title: quizTitle });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.quizzes.some((quizEntry) => quizEntry.quizId.equals(quiz._id))) {
      console.log(quiz);

      user.quizzes.push({
        quizId: quiz._id,
        responses: [],
        score: 0,
        duration: quiz.duration, // Include quiz duration in the user's quizzes
      });

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
// exports.submitQuizResponses = async (req, res) => {
//   const { userId, quizId, quizResponses } = req.body; // Extract userId, quizId, and responses from the request body
//   try {
//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find the quiz by ID
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }  

//     // Calculate score based on responses - this is a simple correct/incorrect count
//     let score = 0;
//     quizResponses.forEach(response => {
//       const question = quiz.questions.id(response.questionId);
//       if (question && question.answer === response.chosenOption) {
//         score += 1; // Increment score for correct answers
//       }
//     });
  
//     // Save the quiz responses and score in the user's document
//     const quizAttempted = user.quizzes.find(obj => {
//       return obj.quizId.toString() === quizId;
//     });
    
//     quizAttempted.responses = [];
//     quizAttempted.score = score;
//     quizAttempted.responses.push( ...quizResponses);

//     await user.save();

//     res.status(200).json({ message: 'Quiz responses submitted successfully', score });
//   } catch (error) {
//     console.error('Error submitting quiz responses:', error);
//     res.status(500).json({ message: 'Error submitting quiz responses', error: error.message });
//   }
// };

//Version 2.0
// Function to handle the submission of quiz responses
exports.submitQuizResponses = async (req, res) => {
  const { userId, quizId, quizResponses, timeTaken } = req.body; // Extract userId, quizId, responses, and timeTaken from the request body
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
  
    // Save the quiz responses, score, and time taken in the user's document
    const quizAttempted = user.quizzes.find(obj => {
      return obj.quizId.toString() === quizId;
    });
    
    quizAttempted.responses = [];
    quizAttempted.score = score;
    quizAttempted.timeTaken = timeTaken; // Add timeTaken to the quizAttempted
    quizAttempted.responses.push( ...quizResponses);

    await user.save();

    res.status(200).json({ message: 'Quiz responses submitted successfully', score });
  } catch (error) {
    console.error('Error submitting quiz responses:', error);
    res.status(500).json({ message: 'Error submitting quiz responses', error: error.message });
  }
};

///

exports.showQuizResponse=async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'quizzes.quizId', 
      model: 'Quiz',
  });
    res.json(user.quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Create group
exports.createGroup = async (req, res) => {
  try {
    const { groupName, emailIds } = req.body;

    // Validate if groupName and emailIds are present
    if (!groupName || !emailIds) {
      return res.status(400).json({ message: 'Group name and email IDs are required.' });
    }

    // Create a new group in the database
    const newGroup = new Group({ groupName, emailIds });
    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully.', group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};