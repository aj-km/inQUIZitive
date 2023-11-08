import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './QuizSubmitted.css'

const QuizSubmitted = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const { loading, error, quizDataFromBackend,quizCreated } = useSelector((state) => state.quiz);

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div className="success-container">
      <h1>Quiz Submitted Successfully!</h1>
      {/* <p>Your quiz has been submitted and is now available for users.</p> */}
      <button className="return-btn" onClick={handleReturn}>
        Attempt Another Quiz
      </button>
    </div>
  );
}

export default QuizSubmitted;