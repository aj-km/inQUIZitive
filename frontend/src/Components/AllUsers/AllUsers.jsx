import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import "./AllUsers.css";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.allUsers);
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  return (
    <div className="all-users-container">
      <h2 style={{textAlign:"center" , }}>USER LIST</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <ul className="user-list">
          {users &&
            users.map((user) => (
              <li key={user._id} onClick={() => handleUserClick(user._id)} className={`user-item ${selectedUser === user._id ? 'selected' : ''}`}>
                <p className="user-name">Name: {user.name}</p>
                <p className="user-email">Email: {user.email}</p>
                { user.isAdmin ? (
                  <p className="admin-status">Admin user </p>
                ) : (
                  selectedUser === user._id  && (
                    <div className="user-details">
                      <p className="quiz-heading">Quizzes:</p>
                      <ul className="quiz-list">
                        {user.quizzes &&
                          user.quizzes.map((quiz) => (
                            <li key={quiz._id} className="quiz-item">

                              <p className="quiz-title">Quiz Title: {quiz.quizId.title}</p>
                              <p className="quiz-score">Score: {quiz.score}</p>
                              <p className="quiz-start-time">Start Time: {quiz.startTime}</p>
                              <p className="quiz-end-time">End Time: {quiz.endTime}</p>
                              <p className="quiz-time-taken">Time Taken: {quiz.timeTaken}</p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;

