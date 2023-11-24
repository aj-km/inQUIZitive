import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz, resetCreateQuiz } from "../../Actions/quizActions";
import "./QuizInput.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const QuestionInput = () => {
  const [numQuestions, setNumQuestions] = useState();
  const [quizTitle, setQuizTitle] = useState();
  const [quizDuration, setQuizDuration] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [quizType, setquizType] = useState("MCQ");
  const [quizData, setQuizData] = useState({
    title: "",
    type: "",
    questions: [{ question: "", options: ["", "", "", ""], answer: "" }],
    duration: 0,
  });
  const alert = useAlert();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  error, quizCreated } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (quizCreated) {
      navigate("/quiz-success");
    }
    return () => {
      dispatch(resetCreateQuiz());
    };
  }, [quizCreated, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, dispatch]);

  useEffect(() => {
    const totalMilliseconds =
      quizDuration.hours * 60 * 60 * 1000 +
      quizDuration.minutes * 60 * 1000 +
      quizDuration.seconds * 1000;

    setQuizData((prevData) => ({
      ...prevData,
      title: quizTitle,
      type: quizType,
      duration: totalMilliseconds,
      questions: Array.from({ length: numQuestions }, (_, index) => {
        const defaultQuestionData = {
          question: prevData.questions[index]?.question || "",
          options: prevData.questions[index]?.options || ["", "", "", ""],
          answer: prevData.questions[index]?.answer || "",
        };

        switch (quizType) {
          case "MCQ":
            return defaultQuestionData;
          case "T/F":
            return {
              ...defaultQuestionData,
              options: ["T", "F"],
              answer: "", 
            };
          case "Short Answer":
          case "Long Answer":
            return {
              ...defaultQuestionData,
              options: [],
              answer: "", 
            };
          default:
            return defaultQuestionData;
        }
      }),
    }));
  }, [numQuestions, quizTitle, quizDuration, quizType]);

  const handlequizTypeChange = (e) => {
    setquizType(e.target.value);
  };

  console.log(quizData);

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = Number(e.target.value);
    setNumQuestions(newNumQuestions);
  };

  const handleQuizTitleChange = (e) => {
    const newQuizTitle = e.target.value;
    setQuizTitle(newQuizTitle);
  };

  const handleQuizDurationChange = (type) => (e) => {
    setQuizDuration((prevDuration) => ({
      ...prevDuration,
      [type]: e.target.value,
    }));
  };

  const handleQuestionChange = (e) => {
    const newQuestions = [...quizData.questions];
    newQuestions[currentQuestion] = {
      ...newQuestions[currentQuestion],
      question: e.target.value,
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
      <h1>Create a quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={handleQuizTitleChange}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Number of Questions"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          required
        />
        <div>
          <label htmlFor="quizType">Select Quiz Type:</label>
          <select
            id="quizType"
            value={quizType}
            onChange={handlequizTypeChange}
          >
            <option value="MCQ">Multiple Choice</option>
            <option value="T/F">True/False</option>
            <option value="Short Answer">Short Answer</option>
            <option value="Long Answer">Long Answer</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            placeholder="Hours"
            value={quizDuration.hours}
            onChange={handleQuizDurationChange("hours")}
            required
          />
          <input
            type="number"
            placeholder="Minutes"
            value={quizDuration.minutes}
            onChange={handleQuizDurationChange("minutes")}
            required
          />
          <input
            type="number"
            placeholder="Seconds"
            value={quizDuration.seconds}
            onChange={handleQuizDurationChange("seconds")}
            required
          />
        </div>
        {numQuestions > 0 && (
          <>
            <input
              type="text"
              value={quizData.questions[currentQuestion]?.question}
              onChange={handleQuestionChange}
              placeholder={`Question ${currentQuestion + 1}`}
              required
            />
            {quizData.questions[currentQuestion]?.options.map(
              (option, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  value={option}
                  onChange={handleOptionChange(oIndex)}
                  placeholder={`Option ${oIndex + 1}`}
                  required
                />
              )
            )}
            {quizType !== "Short Answer" && quizType !== "Long Answer" && (
              <input
                type="text"
                value={quizData.questions[currentQuestion]?.answer}
                onChange={handleAnswerChange}
                placeholder="Correct Answer"
                required
              />
            )}
            <div>
              <button
                type="button"
                onClick={handlePrevClick}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                disabled={currentQuestion === numQuestions - 1}
              >
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
