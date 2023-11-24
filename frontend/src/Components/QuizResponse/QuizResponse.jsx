
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuizResponse.css';
import { useSelector } from 'react-redux';

function QuizResponse() {
  const [quizzes, setQuizzes] = useState([]);
  const [showResponses, setShowResponses] = useState({});
  const userId = useSelector((state) => state.user.user._id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/api/${userId}/quizzes`);
      setQuizzes(res.data);
    };

    fetchData();
  }, [userId]);

  const toggleResponses = (index) => {
    setShowResponses((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = [];

    if (hours > 0) {
      formattedTime.push(`${hours}h`);
    }

    if (minutes > 0 || (hours === 0 && seconds > 0)) {
      formattedTime.push(`${minutes}m`);
    }

    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      formattedTime.push(`${seconds}s`);
    }

    return formattedTime.join(' ');
  };

  return (
    <div className="quiz-response">
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz">
          <h2 className="quiz-title" onClick={() => toggleResponses(index)}>
            {quiz.quizId.title}
          </h2>
          {showResponses[index] && (
            <>
              {quiz.responses.map((response, i) => (
                <p key={i} className="quiz-question">
                  Question {i + 1}: {quiz.quizId.questions[i].question} <br />
                  Chosen Option: {response.chosenOption} <br />
                  Correct Answer: {quiz.quizId.questions[i].answer}
                </p>
              ))}
              <p className="quiz-score">Total Score: {quiz.score}/{quiz.quizId.questions.length}</p>
              <p className="quiz-time">
                Time Taken: {formatTime(quiz.timeTaken)} <br /> Quiz duration: {formatTime(quiz.quizId.duration)}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizResponse;
