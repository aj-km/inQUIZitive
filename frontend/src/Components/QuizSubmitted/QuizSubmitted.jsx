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
      <button className="return-btn" onClick={handleReturn}>
        Return to Home page
      </button>
    </div>
  );
}

export default QuizSubmitted;