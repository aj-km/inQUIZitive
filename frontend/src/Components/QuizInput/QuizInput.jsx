import React, { useState } from 'react';
import './QuizInput.css';

const QuestionInput = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showExportButton, setShowExportButton] = useState(false);

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
    setQuestions(Array.from({ length: e.target.value }, () => ({ question: '', options: ['', '', '', ''], answer: '' })));
    setAnswers(Array.from({ length: e.target.value }, () => ''));
  };

  const handleQuestionChange = (e) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (oIndex) => (e) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].options[oIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNextClick = () => {
    if (currentQuestion < numQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowExportButton(true);
    }
  };
  // const handlePrevClick = () => {
  //   if (currentQuestion >0) {
  //     setCurrentQuestion(currentQuestion - 1);
  //   } else {
      
  //   }
  // };
  const exportData = () => {
    console.log(questions);
    console.log(answers);
  };

  return (
    <div className="QuestionInput">
      <input type="number" 
      placeholder="Enter the number of Questions to give in Quiz" 
      value={numQuestions} onChange={handleNumQuestionsChange}  />
      {numQuestions > 0 && (
        <div>
          <input type="text" value={questions[currentQuestion].question} onChange={handleQuestionChange} placeholder={`Enter question ${currentQuestion + 1}`} />
          {questions[currentQuestion].options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={handleOptionChange(oIndex)}
              placeholder={`Option ${oIndex + 1}`}
            />
          ))}
          <input type="text" value={answers[currentQuestion]} onChange={handleAnswerChange} placeholder="Enter correct answer" />
         {/* <button className="btn1" onClick={handlePrevClick}>Previous</button> */}
          <button className="btn2" onClick={handleNextClick}>Next</button>
        </div>
      )}
      {showExportButton && <button onClick={exportData}>Create QUIZ</button>}
    </div>
  );
};

export default QuestionInput;
