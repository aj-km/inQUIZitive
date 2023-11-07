// QuizComponent.jsx
import { useDispatch, useSelector } from 'react-redux';
import { resetQuizSubmit, submitQuizResponses } from '../../Actions/quizActions';
import React, { useEffect, useState } from 'react';
import './QuizComponent.css'; // Make sure the path to your CSS file is correct
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const QuizComponent = ({ quiz }) => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const { submitSuccess }=useSelector(state=>state.submitQuiz);
  // const alert = useAlert();
  const navigate = useNavigate();
  
  // Initialize state to keep track of selected options for each question
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if(submitSuccess){
      navigate("/quiz-submitted");
    }
    return () => {
      dispatch(resetQuizSubmit());
    }
  }, [submitSuccess, navigate, dispatch]);

  const handleOptionChange = (questionId, option) => {
    // Update the selected option for the question
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an array of responses from selectedOptions
    const responses = Object.keys(selectedOptions).map((questionId) => ({
      questionId,
      chosenOption: selectedOptions[questionId],
    }));

    // Dispatch the submit action
    dispatch(submitQuizResponses(user._id, quiz.quizId._id, responses));
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">{quiz.quizId.title}</h2>
      <form className="quiz-form" onSubmit={handleSubmit}>
        {quiz.quizId.questions.map((question) => (
          <div key={question._id} className="question">
            <p className="question-text">{question.question}</p>
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
