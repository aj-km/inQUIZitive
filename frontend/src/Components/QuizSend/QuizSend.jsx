import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendQuiz } from '../../Actions/quizActions';
import './QuizSend.css';

const QuizSend = () => {
  const [userEmail, setUserEmail] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  
  const dispatch = useDispatch();

  const quizSend = useSelector(state => state.sendQuiz);
  const { loading, error, success } = quizSend;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendQuiz( userEmail, quizTitle));
  };

  return (
    <div className="quiz-send-container">
      <div className="quiz-send">
        <h2>Send Quiz to User</h2>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {success && <p className="success">Quiz sent successfully!</p>}
        <form onSubmit={submitHandler} className="quiz-send-form">
          <label htmlFor="userEmail">User Email</label>
          <input 
            id="userEmail"
            type="email" 
            placeholder="Enter user's email" 
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <label htmlFor="quizTitle">Quiz Title</label>
          <input 
            id="quizTitle"
            type="text" 
            placeholder="Enter quiz title" 
            value={quizTitle} 
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
          <button type="submit" className="quiz-send-button">Send Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default QuizSend;
