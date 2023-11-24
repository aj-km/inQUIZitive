import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Home = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const isAdmin = user.isAdmin;

  const linksUser = [
    { name: "Attempt Quiz", path: "/attempt-quiz" },
    { name: "Past Quiz Response", path: "/quiz-response" },
    { name: "Account", path: "/account" },
  ];

  const linksAdmin = [
    { name: "All Quizzes", path: "/all-quizzes" },
    { name: "Create Quiz", path: "/createQuiz" },
    { name: "Send Quiz to User", path: "/send-quiz" },
    { name: "Create Groups", path: "/create-group" },
    {name:"Send quiz to Group",path:"/sendToGroup"},
    { name: "Account", path: "/account" },
  ];

  return userLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
    <div className="home-content">
      {
        isAdmin ?
        <ul>
          {linksAdmin.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        :
        <ul>
          {linksUser.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      }
    </div>
  </div>
  );
};

export default Home;
