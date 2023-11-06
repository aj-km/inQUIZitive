import React, { useEffect } from "react";
import User from "../User/User";
import Quiz from "../Quiz/Quiz";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Avatar, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Footer from "../Footer/Footer";


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


  const { user, loading: userLoading } = useSelector((state) => state.user);

  return  userLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {/* <h1> Quiz </h1> */}
        <Quiz name="Geography Quiz" questions={questions} />
      </div>

      <div className="homeright">

      <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>

      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
