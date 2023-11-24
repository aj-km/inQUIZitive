import { useDispatch, useSelector } from 'react-redux';
import { resetQuizSubmit, submitQuizResponses } from '../../Actions/quizActions';
import React, { useEffect, useState, useRef } from 'react';
import './QuizComponent.css';
import { useNavigate } from 'react-router-dom';
const QuizComponent = ({ quiz }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { submitSuccess } = useSelector((state) => state.submitQuiz);
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [textResponses, setTextResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.quizId.duration / 1000);
  const intervalRef = useRef(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        clearInterval(intervalRef.current);
        handleSubmit(new Event('submit'));
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (submitSuccess) {
      navigate('/quiz-submitted');
    }
    return () => {
      dispatch(resetQuizSubmit());
    };
  }, [submitSuccess, navigate, dispatch]);

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  const handleTextResponseChange = (questionId, response) => {
    setTextResponses((prevTextResponses) => ({
      ...prevTextResponses,
      [questionId]: response,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearInterval(intervalRef.current);

    const timeTaken = Date.now() - startTime.current;

    const responses = Object.keys(selectedOptions).map((questionId) => ({
      questionId,
      chosenOption: selectedOptions[questionId],
    }));

    const textResponsesArray = Object.keys(textResponses).map((questionId) => ({
      questionId,
      chosenOption: textResponses[questionId],
    }));

    dispatch(
      submitQuizResponses(user._id, quiz.quizId._id, responses, textResponsesArray, timeTaken)
    );
  };

  return (
    <div className="quiz-container">
      <div className="timer-dashboard">
        <p>Time left:</p>
        <h1 className="timer">
          {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
          {timeLeft % 60}
        </h1>
      </div>
      <h2 className="quiz-title">{quiz.quizId.title}</h2>
      <form className="quiz-form" onSubmit={handleSubmit}>
        {quiz.quizId.questions.map((question) => (
          <div key={question._id} className="question">
            <p className="question-text">{question.question}</p>
            {(quiz.quizId.type === 'Short Answer') || (quiz.quizId.type === 'Long Answer') ? (
              <textarea
                value={textResponses[question._id] || ''}
                onChange={(e) => handleTextResponseChange(question._id, e.target.value)}
                placeholder={`Type your ${quiz.quizId.type} response here`}
              />
            ) : (
              <div className="options-container">
                {question.options.map((option) => (
                  <label className="option-label" key={option}>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={option}
                      checked={selectedOptions[question._id] === option}
                      onChange={() => handleOptionChange(question._id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizComponent;
