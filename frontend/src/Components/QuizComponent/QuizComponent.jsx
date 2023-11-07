// QuizComponent.jsx
import React, { useState } from 'react';
import './QuizComponent.css'; // Make sure the path to your CSS file is correct

const QuizComponent = ({ quiz, onSubmit }) => {
  // Initialize state to keep track of selected options for each question
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionId, option) => {
    // Update the selected option for the question
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission to a server
    onSubmit(selectedOptions); // Pass the selected options up to the parent component
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
