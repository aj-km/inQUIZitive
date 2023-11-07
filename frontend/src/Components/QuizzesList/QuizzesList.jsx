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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes } from '../../Actions/quizActions';
import QuizComponent from '../QuizComponent/QuizComponent';
import './QuizzesList.css'; // Import the CSS file for styling

const QuizzesList = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { quizzes, loading, error } = useSelector((state) => state.fetchQuiz);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(fetchQuizzes(user._id));
    }
  }, [dispatch, isAuthenticated, user?._id]);

  const handleQuizSelection = (quizId) => {
    const quiz = quizzes.find((q) => q.quizId._id === quizId);
    setSelectedQuiz(quiz);
  };

  return (
    <div className="quizzes-list">
      {loading && <p>Loading quizzes...</p>}
      {error && <p>Error loading quizzes: {error}</p>}
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz.quizId._id} onClick={() => handleQuizSelection(quiz.quizId._id)}>
            {quiz.quizId.title}
          </li>
        ))}
      </ul>
      {selectedQuiz && <QuizComponent quiz={selectedQuiz} />}
    </div>
  );
};

export default QuizzesList;
