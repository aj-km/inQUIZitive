// export default QuizzesList;
// QuizzesList.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuizzes } from '../../Actions/quizActions';
// import QuizComponent from '../QuizComponent/QuizComponent';

// const QuizzesList = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   const { quizzes, loading, error } = useSelector((state) => state.fetchQuiz);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       dispatch(fetchQuizzes(user._id));
//     }
//   }, [dispatch, isAuthenticated, user?._id]);

//   const handleQuizSelection = (quizId) => {
//     const quiz = quizzes.find((q) => q.quizId._id === quizId);
//     setSelectedQuiz(quiz);
//   };

//   return (
//     <div>
//       {loading && <p>Loading quizzes...</p>}
//       {error && <p>Error loading quizzes: {error}</p>}
//       <ul>
//         {quizzes.map((quiz) => (
//           <li key={quiz.quizId._id} onClick={() => handleQuizSelection(quiz.quizId._id)}>
//             {quiz.quizId.title}
//           </li>
//         ))}
//       </ul>
//       {selectedQuiz && <QuizComponent quiz={selectedQuiz} />}
//     </div>
//   );
// };

// export default QuizzesList;
// QuizzesList.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuizzes } from '../../Actions/quizActions';
// import QuizComponent from '../QuizComponent/QuizComponent';
// import './QuizzesList.css'; // Import the CSS file for styling

// const QuizzesList = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   const { quizzes, loading, error } = useSelector((state) => state.fetchQuiz);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       dispatch(fetchQuizzes(user._id));
//     }
//   }, [dispatch, isAuthenticated, user?._id]);

//   const handleQuizSelection = (quizId) => {
//     const quiz = quizzes.find((q) => q.quizId._id === quizId);
//     setSelectedQuiz(quiz);
//   };

//   return (
//     <div className="quizzes-list">
//       {/* {loading && <p>Loading quizzes...</p>} */}
//       {<p>You can attempt following quizzes:</p>}
//       {error && <p>Error loading quizzes: {error}</p>}
//       <ul className="quiz-list">
//         {quizzes.map((quiz) => (
//           <li key={quiz.quizId._id} onClick={() => handleQuizSelection(quiz.quizId._id)}>
//             {quiz.quizId.title}
//           </li>
//         ))}
//       </ul>
//       {selectedQuiz && <QuizComponent quiz={selectedQuiz} />}
//     </div>
//   );
// };

// export default QuizzesList;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes } from '../../Actions/quizActions';
import QuizComponent from '../QuizComponent/QuizComponent';
import './QuizzesList.css';

const QuizzesList = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { quizzes, loading, error } = useSelector((state) => state.fetchQuiz);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date()); // Update current time every second
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(fetchQuizzes(user._id));
    }
  }, [dispatch, isAuthenticated, user?._id]);

  const isQuizActive = (quiz) => {
    const currentTime = new Date(); 
    const quizStartTime = new Date(quiz.startTime);
    const quizEndTime = new Date(quiz.endTime);
    console.log(quiz.endTime);
    console.log(currentTime , quizStartTime , quizStartTime);
    return (currentTime.getTime() >= quizStartTime.getTime()) && (currentTime.getTime() < quizEndTime.getTime());
  };

  const handleQuizSelection = (quizId) => {
    const selectedQuiz = quizzes.find((q) => q.quizId._id === quizId);
    // Check if the quiz is currently active
    if (isQuizActive(selectedQuiz)) {
      setSelectedQuiz(selectedQuiz);
    } else {
      console.log("This quiz is not currently active.");
    }
  };

  return (
    <div className="quizzes-list">
      {error && <p>Error loading quizzes: {error}</p>}
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li
            key={quiz.quizId._id}
            onClick={() => handleQuizSelection(quiz.quizId._id)}
            className={isQuizActive(quiz) ? 'active-quiz' : ''}
          >
            <div>
              <span>{quiz.quizId.title}</span>
              <span> - Start Time: {quiz.date} {quiz.startTime}</span>
            </div>
          </li>
        ))}
      </ul>
      {selectedQuiz && <QuizComponent quiz={selectedQuiz} />}
    </div>
  );
};

export default QuizzesList;

