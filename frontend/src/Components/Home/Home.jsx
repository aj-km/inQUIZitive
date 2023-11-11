// import React, { useEffect } from "react";
// import User from "../User/User";
// import QuizInput from "../QuizInput/QuizInput";
// import "./Home.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../Actions/User";
// import Loader from "../Loader/Loader";
// import { Avatar, Typography } from "@mui/material";
// import { useAlert } from "react-alert";
// import Footer from "../Footer/Footer"; // Import the Footer component
// import QuizzesList from "../QuizzesList/QuizzesList";
// import QuizAll from "../QuizAll/QuizAll";
// import QuizSend from "../QuizSend/QuizSend";
// import QuizResponse from "../QuizResponse/QuizResponse";
// import Sidebar from "../Sidebar/Sidebar";

// const Home = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { user, loading: userLoading } = useSelector((state) => state.user);

//   return userLoading === true ? (
//     <Loader />
//   ) : (
//     <div className="home">
//       {/* <Sidebar/> */}
//       <div className="homeleft">
//         {/* <QuizzesList /> */}
//         {/* <QuizResponse userId={user._id} /> */}
//         {/* <QuizSend/> */}
//         <QuizAll/>
//         <Sidebar/>
//       </div>

//       <div className="homeright">
//         <Avatar
//           src={user.avatar.url}
//           sx={{ height: "8vmax", width: "8vmax" }}
//         />
//         <Typography variant="h5">{user.name}</Typography>
//       </div>
//     </div>
//   );
// };

// export default Home;




// // import React, { useEffect } from "react";
// // import User from "../User/User";
// // import QuizInput from "../QuizInput/QuizInput";
// // import "./Home.css";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllUsers } from "../../Actions/User";
// // import Loader from "../Loader/Loader";
// // import { Avatar, Typography } from "@mui/material";
// // import { useAlert } from "react-alert";
// // import Footer from "../Footer/Footer";
// // import QuizzesList from "../QuizzesList/QuizzesList";
// // import QuizAll from "../QuizAll/QuizAll";
// // import QuizSend from "../QuizSend/QuizSend";
// // import QuizResponse from "../QuizResponse/QuizResponse";
// // import Sidebar from "../Sidebar/Sidebar";

// // const Home = () => {
// //   const dispatch = useDispatch();
// //   const alert = useAlert();

// //   const { user, loading: userLoading } = useSelector((state) => state.user);

// //   useEffect(() => {
// //     dispatch(getAllUsers());
// //   }, [dispatch]);

// //   return userLoading === true ? (
// //     <Loader />
// //   ) : (
// //     <div className="home">
// //       <Sidebar /> {/* Place the Sidebar component here */}
      
// //       <div className="home-content">
// //         <div className="home-left">
// //           {/* Content that should appear to the left of the sidebar */}
// //           <QuizAll />
// //         </div>

// //         <div className="home-right">
// //           {/* Content that should appear to the right of the sidebar */}
// //           <Avatar src={user.avatar.url} sx={{ height: "8vmax", width: "8vmax" }} />
// //           <Typography variant="h5">{user.name}</Typography>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;




import React from "react";
import User from "../User/User";
import QuizInput from "../QuizInput/QuizInput";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Avatar, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Footer from "../Footer/Footer"; // Import the Footer component
import QuizzesList from "../QuizzesList/QuizzesList";
import QuizAll from "../QuizAll/QuizAll";
import QuizSend from "../QuizSend/QuizSend";
import QuizResponse from "../QuizResponse/QuizResponse";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);

  return userLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="home-content">
        {/* Add your main content components here */}
        <QuizAll />
      </div>
    </div>
  );
};

export default Home;
