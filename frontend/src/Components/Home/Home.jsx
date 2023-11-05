import React, { useEffect } from "react";
import User from "../User/User";
import Quiz from "../Quiz/Quiz";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers} from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";


const questions = [
  {
    text: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid']
  },
  {
    text: 'What is the capital of England?',
    options: ['Paris', 'London', 'Berlin', 'Madrid']
  },
  // Add more questions here...
];

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();


  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // useEffect(() => {

  //   if (message) {
  //     alert.success(message);
  //     dispatch({ type: "clearMessage" });
  //   }
  // }, [alert,  dispatch]);

  return  usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {/* <h1> Quiz </h1> */}
        <Quiz name="Geography Quiz" questions={questions} />
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
