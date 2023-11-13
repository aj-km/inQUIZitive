import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes, setActiveQuiz } from '../../Actions/quizActions';
import './QuizAll.css'; // Make sure to import the CSS file

const QuizAll = () => {
  const dispatch = useDispatch();
  const { loading, quizzes, error, activeQuiz } = useSelector(state => state.allQuizzes);

  useEffect(() => {
    dispatch(getQuizzes());
  }, [dispatch]);

  const handleQuizClick = (quiz) => {
    if (activeQuiz && activeQuiz._id === quiz._id) {
      dispatch(setActiveQuiz(null));
    } else {
      dispatch(setActiveQuiz(quiz));
    }
  };

  return (
    <div className="quiz-all-container">
      {loading && <p className="loading">Loading quizzes...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul className="quiz-list">
        {quizzes.map(quiz => (
          <li 
            key={quiz._id} 
            onClick={() => handleQuizClick(quiz)}
            className={activeQuiz && activeQuiz._id === quiz._id ? 'active' : ''}
          >
            {quiz.title}
          </li>
        ))}
      </ul>
      {activeQuiz && (
        <div className="active-quiz">
          <h3>{activeQuiz.title}</h3>
          <ul className="question-list">
            {activeQuiz.questions.map((question, index) => (
              <li key={index}>
                <p>{question.question}</p>
                <ul className="options-list">
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                  <p>Answer : {question.answer}</p>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizAll;
