// import React, { useEffect } from "react";
// import User from "../User/User";
// import QuizAttempt from "../QuizAttempt/QuizAttempt";
// import "./Home.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers} from "../../Actions/User";
// import Loader from "../Loader/Loader";
// import { Avatar, Typography } from "@mui/material";
// import { useAlert } from "react-alert";
// import Footer from "../Footer/Footer";
// import QuizSend from "../QuizSend/QuizSend";
// import QuizAll from "../QuizAll/QuizAll";
// import QuizzesList from "../QuizzesList/QuizzesList";


// const questions = [
//   {
//     text: 'What is the capital of France?',
//     options: ['Paris', 'London', 'Berlin', 'Madrid']
//   },
//   {
//     text: 'What is the capital of England?',
//     options: ['Paris', 'London', 'Berlin', 'Madrid']
//   },
//   // Add more questions here...
// ];

// const Home = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();


//   const { user, loading: userLoading } = useSelector((state) => state.user);
//   //yahan pe isAdmin logic laga le
//   return  userLoading === true ? (
//     <Loader />
//   ) : (
//     <div className="home">
//       <div className="homeleft">
//         {/* <h1> Quiz </h1> */}
//         {/* <QuizAttempt name="Geography Quiz" questions={questions} /> */}
//         {/* <QuizSend/> */}
//         {/* <QuizAll/> */}
//         <QuizzesList/>
//       </div>

//       <div className="homeright">

//       <Avatar
//           src={user.avatar.url}
//           sx={{ height: "8vmax", width: "8vmax" }}
//         />
//         <Typography variant="h5">{user.name}</Typography>

//       </div>
//       {/* <Footer/> */}
//     </div>
//   );
// };

// export default Home;


// Home.js
import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    // { name: "Leaderboard", path: "/leaderboard" },
    { name: "Create Groups", path: "/create-group" },
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
