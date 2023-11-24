
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes, getLeaderboardQuizzes } from '../../Actions/quizActions';
import './Leaderboard.css';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const {quizzes} = useSelector(state => state.allQuizzes);
  const state = useSelector(state => state); 
  const leaderboardQuizzes = useSelector(state => state.leaderboardQuizzes); 

  console.log(quizzes); 
  console.log(state); 
  console.log(leaderboardQuizzes); 

  useEffect(() => {
    dispatch(getQuizzes());
  }, [dispatch]);

  const handleQuizClick = (quizId) => {
    dispatch(getLeaderboardQuizzes());
    setSelectedQuiz(quizId);
  };

  return (
    <div className="leaderboard">
      <div className="quiz-list-leaderboard">
        <h2>Quizzes</h2>
        <ul>
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
