import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ name, questions }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizStarted, setQuizStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [quizStarted, timeLeft]);

  const handleSubmit = () => {
    setQuizStarted(false);
    setSubmitted(true);
    console.log(answers);
  };

  return (
    <div className="container">
      <h1>{name}</h1>
      {!quizStarted && !submitted ? (
        <>
          <p className="instructions">The time for the quiz is 5 minutes.</p>
          <button className="start-button" onClick={() => setQuizStarted(true)}>Start Quiz</button>
        </>
      ) : submitted ? (
        <p>Thank you! Your quiz has been successfully submitted.</p>
      ) : (
        <>
        <div className="timer">Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question">
              <h2>{questionIndex + 1}. {question.text}</h2>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="option">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={option}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[questionIndex] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
  
};

export default Quiz;
