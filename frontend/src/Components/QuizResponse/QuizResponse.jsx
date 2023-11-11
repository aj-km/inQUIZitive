import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuizResponse.css';

function QuizResponse({ userId }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/api/${userId}/quizzes`);
      setQuizzes(res.data);
    };

    fetchData();
  }, [userId]);

//   console.log(quizzes);

  return (
    <div className="quiz-response">
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz">
          <h2 className="quiz-title">{quiz.quizId.title}</h2>
          {quiz.responses.map((response, i) => (
            <p key={i} className="quiz-question">
              Question: {quiz.quizId.questions[i].question} <br />
              Chosen Option: {response.chosenOption}    <br />
              Correct Answer: {quiz.quizId.questions[i].answer}
            </p>
          ))}
          <p className="quiz-score">Total Score: {quiz.score}</p>
        </div>
      ))}
    </div>
  );
}

export default QuizResponse;
