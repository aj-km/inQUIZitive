import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from '../../features/quizzes/quizSlice';
import './QuizForm.css';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [],
    answers: []
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Quiz created successfully!');
      navigate('/dashboard');
    } else if (status === 'failed') {
      alert(`Failed to create quiz: ${error}`);
    }
  }, [status, error, navigate]);

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value, 10);
    setNumQuestions(newNumQuestions);
    setQuizData(prevData => ({
      ...prevData,
      questions: new Array(newNumQuestions).fill(null).map(() => ({
        question: '',
        options: ['', '', '', '']
      })),
      answers: new Array(newNumQuestions).fill('')
    }));
  };

  const handleQuestionChange = (index) => (e) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index].question = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex) => (e) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].options[oIndex] = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleAnswerChange = (index) => (e) => {
    const newAnswers = [...quizData.answers];
    newAnswers[index] = e.target.value;
    setQuizData({ ...quizData, answers: newAnswers });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(quizData);


    dispatch(createQuiz(quizData));
  };
  return (
    <div className="QuestionInput"> {/* This applies the .QuestionInput styles to your form */}
      {status === 'loading' && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          onChange={(e) => setQuizData({...quizData, title: e.target.value})}
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
        {quizData.questions.map((_, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={quizData.questions[index].question}
              onChange={handleQuestionChange(index)}
              required
            />
            {quizData.questions[index].options.map((_, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={quizData.questions[index].options[oIndex]}
                onChange={handleOptionChange(index, oIndex)}
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={quizData.answers[index]}
              onChange={handleAnswerChange(index)}
              required
            />
          </div>
        ))}
        <button type="submit" disabled={status === 'loading'} className="btn1">
          {status === 'loading' ? 'Creating...' : 'Create Quiz'}
        </button>
        {/* If you have a second button, apply btn2 class like this:
        <button type="button" className="btn2">Second Button Text</button>
        */}
      </form>
    </div>
  );

  // return (
  //   <div>
  //     {status === 'loading' && <p>Loading...</p>}
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="title"
  //         placeholder="Quiz Title"
  //         onChange={(e) => setQuizData({...quizData, title: e.target.value})}
  //         required
  //       />
  //       <input
  //         type="number"
  //         min="1"
  //         placeholder="Number of Questions"
  //         value={numQuestions}
  //         onChange={handleNumQuestionsChange}
  //         required
  //       />
  //       {quizData.questions.map((_, index) => (
  //         <div key={index}>
  //           <input
  //             type="text"
  //             placeholder={`Question ${index + 1}`}
  //             value={quizData.questions[index].question}
  //             onChange={handleQuestionChange(index)}
  //             required
  //           />
  //           {quizData.questions[index].options.map((_, oIndex) => (
  //             <input
  //               key={oIndex}
  //               type="text"
  //               placeholder={`Option ${oIndex + 1}`}
  //               value={quizData.questions[index].options[oIndex]}
  //               onChange={handleOptionChange(index, oIndex)}
  //               required
  //             />
  //           ))}
  //           <input
  //             type="text"
  //             placeholder="Correct Answer"
  //             value={quizData.answers[index]}
  //             onChange={handleAnswerChange(index)}
  //             required
  //           />
  //         </div>
  //       ))}
  //       <button type="submit" disabled={status === 'loading'}>
  //         {status === 'loading' ? 'Creating...' : 'Create Quiz'}
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default QuizForm;
