// // Leaderboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Leaderboard.css"

// const Leaderboard = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [quizResults, setQuizResults] = useState([]);

//   useEffect(() => {
//     // Fetch list of quizzes
//     axios.get('/api/quizzes')
//       .then(response => {
//         setQuizzes(response.data);
//       })
//       .catch(error => console.error('Error fetching quizzes:', error));
//   }, []);

//   const handleQuizClick = (quizId) => {
//     axios.get(`/api/quizzes/${quizId}/results`)
//       .then(response => {
//         setQuizResults(response.data);
//         setSelectedQuiz(quizId);
//       })
//       .catch(error => console.error('Error fetching quiz results:', error));
//   };

//   return (
//     <div className="leaderboard">
//       <div className="quiz-list">
//         <h2>Quizzes</h2>
//         <ul>
//           {quizzes.map(quiz => (
//             <li key={quiz._id} onClick={() => handleQuizClick(quiz._id)}>
//               {quiz.title}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedQuiz && (
//         <div className="quiz-results">
//           <h2>{quizzes.find(quiz => quiz._id === selectedQuiz).title} Results</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Score</th>
//                 <th>Time Taken</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quizResults.map(result => (
//                 <tr key={result._id}>
//                   <td>{result.user.name}</td>
//                   <td>{result.score}</td>
//                   <td>{result.timeTaken} ms</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;

// Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes, getLeaderboardQuizzes } from '../../Actions/quizActions';
import './Leaderboard.css';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const {quizzes} = useSelector(state => state.allQuizzes); // Assuming you have a reducer for regular quizzes
//   const quizzes = useSelector(state => state.quizzes); // Assuming you have a reducer for regular quizzes
//   const leaderboardQuizzes = useSelector(state => state.allQuizzes); // Assuming you have a reducer for leaderboard quizzes
  const state = useSelector(state => state); // Assuming you have a reducer for leaderboard quizzes
  const leaderboardQuizzes = useSelector(state => state.leaderboardQuizzes); // Assuming you have a reducer for leaderboard quizzes

  console.log(quizzes); ////working fine now
  console.log(state); ////
  console.log(leaderboardQuizzes); ////

  useEffect(() => {
    // Fetch list of quizzes
    dispatch(getQuizzes());
  }, [dispatch]);

  const handleQuizClick = (quizId) => {
    // console.log(quizId);    /////
    // dispatch(getQuizzes()); // Use the new action for fetching leaderboard quizzes
    dispatch(getLeaderboardQuizzes()); // Use the new action for fetching leaderboard quizzes
    setSelectedQuiz(quizId);
  };

  return (
    <div className="leaderboard">
      <div className="quiz-list-leaderboard">
        <h2>Quizzes</h2>
        <ul>
          {/* Map over the regular quizzes from the state */}
          {quizzes.map(quiz => (
            <li key={quiz._id} onClick={() => handleQuizClick(quiz._id)}>
              {quiz.title}
            </li>
          ))}
        </ul>
      </div>

      {selectedQuiz && (
        <div className="quiz-results">
          <h2>{quizzes.find(quiz => quiz._id === selectedQuiz).title} Results</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Score</th>
                <th>Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the leaderboard quizzes from the state */}
              {leaderboardQuizzes.map(result => (
                <tr key={result._id}>
                  <td>{result.user.name}</td>
                  <td>{result.score}</td>
                  <td>{result.timeTaken} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
