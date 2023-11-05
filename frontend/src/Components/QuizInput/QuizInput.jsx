import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from '../../features/quizzes/quizSlice';
import './QuizInput.css';
import { useNavigate } from 'react-router-dom';

const QuestionInput = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [{ question: '', options: ['', '', '', ''], answer: '' }]
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, quizCreated } = useSelector((state) => state.quiz);

  useEffect(() => {
    setQuizData((prevData) => ({
      ...prevData,
      questions: Array.from({ length: numQuestions }, (_, index) => ({
        question: prevData.questions[index]?.question || '',
        options: prevData.questions[index]?.options || ['', '', '', ''],
        answer: prevData.questions[index]?.answer || ''
      }))
    }));
  }, [numQuestions]);

  useEffect(() => {
    if (quizCreated) {
      // navigate to the desired route after quiz creation
      navigate('/quiz-success');
    }
  }, [quizCreated, navigate]);

  useEffect(() => {
    if (error) {
      // Log the error or show a notification
      console.error(error);
    }
  }, [error]);

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = Number(e.target.value);
    setNumQuestions(newNumQuestions);
  };

  const handleQuestionChange = (e) => {
    const newQuestions = [...quizData.questions];
    newQuestions[currentQuestion] = {
      ...newQuestions[currentQuestion],
      question: e.target.value
    };
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (oIndex) => (e) => {
    const newQuestions = [...quizData.questions];
    newQuestions[currentQuestion].options[oIndex] = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleAnswerChange = (e) => {
    const newQuestions = [...quizData.questions];
    newQuestions[currentQuestion].answer = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleNextClick = () => {
    if (currentQuestion < numQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createQuiz(quizData));
  };

  return (
    <div className="QuestionInput">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          placeholder="Number of Questions"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          required
        />
        {numQuestions > 0 && (
          <>
            <input
              type="text"
              value={quizData.questions[currentQuestion]?.question}
              onChange={handleQuestionChange}
              placeholder={`Question ${currentQuestion + 1}`}
              required
            />
            {quizData.questions[currentQuestion]?.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={option}
                onChange={handleOptionChange(oIndex)}
                placeholder={`Option ${oIndex + 1}`}
                required
              />
            ))}
            <input
              type="text"
              value={quizData.questions[currentQuestion]?.answer}
              onChange={handleAnswerChange}
              placeholder="Correct Answer"
              required
            />
            <div>
              <button type="button" onClick={handlePrevClick} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button type="button" onClick={handleNextClick} disabled={currentQuestion === numQuestions - 1}>
                Next
              </button>
            </div>
          </>
        )}
        {currentQuestion === numQuestions - 1 && (
          <button type="submit">Create Quiz</button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default QuestionInput;
