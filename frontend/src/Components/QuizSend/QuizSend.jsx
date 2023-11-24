
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendQuiz } from '../../Actions/quizActions';
import './QuizSend.css';

const QuizSend = () => {
  const [userEmail, setUserEmail] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizStartDate, setQuizStartDate] = useState('');
  const [quizStartTime, setQuizStartTime] = useState('');
  const [quizEndDate, setQuizEndDate] = useState('');
  const [quizEndTime, setQuizEndTime] = useState('');
  const [inputChanged, setInputChanged] = useState(false); // Track whether input changed
  const [successDisplayed, setSuccessDisplayed] = useState(false); // Track success message display
  const [errorDisplayed, setErrorDisplayed] = useState(false); // Track error message display

  const dispatch = useDispatch();

  const quizSend = useSelector(state => state.sendQuiz);
  const { loading, error, success } = quizSend;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendQuiz(userEmail, quizTitle, quizStartDate, quizStartTime, quizEndDate, quizEndTime));
  };

  const handleInputChange = (e) => {
    setInputChanged(true);
    setErrorDisplayed(false);
    setSuccessDisplayed(false);
    // Handle other input changes
    switch (e.target.id) {
      case 'userEmail':
        setUserEmail(e.target.value);
        break;
      case 'quizTitle':
        setQuizTitle(e.target.value);
        break;
      // Handle other input changes
      default:
        break;
    }
  };

  const resetForm = () => {
    setUserEmail('');
    setQuizTitle('');
    setQuizStartDate('');
    setQuizStartTime('');
    setQuizEndDate('');
    setQuizEndTime('');
  };

  // Handle success and error message display
  React.useEffect(() => {
    if (inputChanged) {
      resetForm(); // Reset the form after success
    }
    if (error) {
      setErrorDisplayed(true);
      setSuccessDisplayed(false);
    } else if (success) {
      setErrorDisplayed(false);
      setSuccessDisplayed(true);
    }
  }, [error, success, inputChanged]);

  return (
    <div className="quiz-send-container">
      <div className="quiz-send">
        <h2>Send Quiz to User</h2>
        {loading && <p className="loading">Loading...</p>}
        {errorDisplayed && <p className="error">Error: {error}</p>}
        {successDisplayed && <p className="success">Quiz sent successfully!</p>}
        <form onSubmit={submitHandler} className="quiz-send-form">
          <label htmlFor="userEmail">User Email</label>
          <input
            id="userEmail"
            type="email"
            placeholder="Enter user's email"
            value={userEmail}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <label htmlFor="quizTitle">Quiz Title</label>
          <input
            id="quizTitle"
            type="text"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <label htmlFor="quizStartDate">Quiz Start Date</label>
          <input
            id="quizStartDate"
            type="date"
            value={quizStartDate}
            onChange={(e) => setQuizStartDate(e.target.value)}
            required
          />
          <label htmlFor="quizStartTime">Quiz Starting Time</label>
          <input
            id="quizStartTime"
            type="time"
            value={quizStartTime}
            onChange={(e) => setQuizStartTime(e.target.value)}
            required
          />
          <label htmlFor="quizEndDate">Quiz End Date</label>
          <input
            id="quizEndDate"
            type="date"
            value={quizEndDate}
            onChange={(e) => setQuizEndDate(e.target.value)}
            required
          />
          <label htmlFor="quizEndTime">Quiz Ending Time</label>
          <input
            id="quizEndTime"
            type="time"
            value={quizEndTime}
            onChange={(e) => setQuizEndTime(e.target.value)}
            required
          />
          <button type="submit" className="quiz-send-button">Send Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default QuizSend;
