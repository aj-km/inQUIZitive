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
    <div>
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {users &&
            users.map((user) => (
              <li key={user._id} onClick={() => handleUserClick(user._id)}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                { user.isAdmin ? (
                  <p>Admin user </p>
                ) : (
                  selectedUser === user._id  && (
                    <div>
                      <p>Quizzes:</p>
                      <ul>
                        {user.quizzes &&
                          user.quizzes.map((quiz) => (
                            <li key={quiz._id}>

                              <p>Quiz Title: {quiz.quizId.title}</p>
                              <p>Score: {quiz.score}</p>
                              <p>Start Time: {quiz.startTime}</p>
                              <p>End Time: {quiz.endTime}</p>
                              <p>Time Taken: {quiz.timeTaken}</p>
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
