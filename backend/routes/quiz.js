const express = require("express");
const { getQuizzes, sendQuizToUser, submitQuizResponses } = require('../controllers/quizController');
const router = express.Router();

router.route('/getAllQuizzes').get(getQuizzes);
router.route('/admin/send').post(sendQuizToUser);
router.post('/quizzes/submit', submitQuizResponses);
module.exports = router;