import React from 'react'
import {  useNavigate } from 'react-router-dom';
import './QuizCreationSuccess.css'
const QuizCreationSuccess = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate('/createQuiz');

  };
  return (
    <div className="success-container">
      <h1>Quiz Created Successfully!</h1>
      <p>Your quiz has been created and is now available for users.</p>
      <button className="return-btn" onClick={handleReturn}>
        Create Another Quiz
      </button>
    </div>
  );
}

export default QuizCreationSuccess;