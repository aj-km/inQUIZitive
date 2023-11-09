const express = require("express");
const { getQuizzes, sendQuizToUser, submitQuizResponses, showQuizResponse } = require('../controllers/quizController');
const router = express.Router();

router.route('/getAllQuizzes').get(getQuizzes);
router.route('/admin/send').post(sendQuizToUser);
router.post('/quizzes/submit', submitQuizResponses);
router.get('/:userId/quizzes',showQuizResponse);
module.exports = router;