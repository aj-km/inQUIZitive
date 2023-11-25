const Quiz = require("../models/Quiz");
const User = require("../models/User");
const Group=require("../models/Group");
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

    const { userEmail, quizTitle, quizStartDate, quizStartTime, quizEndDate, quizEndTime } = req.body;
    if (!userEmail || !quizTitle) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    let user = await User.findOne({ email: userEmail });
    let quiz = await Quiz.findOne({ title: quizTitle });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.quizzes.some((quizEntry) => quizEntry.quizId.equals(quiz._id))) {
      const startTime = new Date(`${quizStartDate}T${quizStartTime}`);
      const endTime = new Date(`${quizEndDate}T${quizEndTime}`);
      const startTimeIST = startTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      const endTimeIST = endTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      user.quizzes.push({
        quizId: quiz._id,
        responses: [],
        score: 0,
        duration: quiz.duration,
        startTime: startTimeIST,
        endTime: endTimeIST,
      });

      await user.save();
      res.status(200).json({ message: "Quiz sent to the user successfully" });
    } else {
      res.status(400).json({ message: "User already has this quiz" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuizResponses = async (req, res) => {
  const { userId, quizId, quizResponses, textResponsesArray, timeTaken } = req.body; // Extract userId, quizId, responses, and timeTaken from the request body
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    let score = 0;
    if (quiz.type === "Short Answer" || quiz.type === "Long Answer") {
      const quizAttempted = user.quizzes.find((obj) => {
        return obj.quizId.toString() === quizId;
      });
      quizAttempted.responses = [];
      quizAttempted.score = score;
      quizAttempted.timeTaken = timeTaken;
      quizAttempted.responses.push(...textResponsesArray);
    } else {
      quizResponses.forEach((response) => {
        const question = quiz.questions.id(response.questionId);
        if (question && question.answer === response.chosenOption) {
          score += 1; 
        }
      });
      const quizAttempted = user.quizzes.find((obj) => {
        return obj.quizId.toString() === quizId;
      });
  
      quizAttempted.responses = [];
      quizAttempted.score = score;
      quizAttempted.timeTaken = timeTaken;
      quizAttempted.responses.push(...quizResponses);
    }
    await user.save();

    res
      .status(200)
      .json({ message: "Quiz responses submitted successfully", score });
  } catch (error) {
    console.error("Error submitting quiz responses:", error);
    res
      .status(500)
      .json({
        message: "Error submitting quiz responses",
        error: error.message,
      });
  }
};

exports.showQuizResponse = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "quizzes.quizId",
      model: "Quiz",
    });
    res.json(user.quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGroupByName = async (req, res) => {
  try {
    const { groupName } = req.params;

    const group = await Group.findOne({ groupName });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    return res.status(200).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};