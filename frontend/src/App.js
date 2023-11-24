import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import NotFound from "./Components/NotFound/NotFound";
import QuizInput from "./Components/QuizInput/QuizInput";
import QuizCreationSuccess from "./Components/QuizCreationSuccess/QuizCreationSuccess";
import QuizSubmitted from "./Components/QuizSubmitted/QuizSubmitted";
import Footer from "./Components/Footer/Footer";
import QuizAll from "./Components/QuizAll/QuizAll";
import QuizzesList from "./Components/QuizzesList/QuizzesList";
import QuizSend from "./Components/QuizSend/QuizSend";
import QuizResponse from "./Components/QuizResponse/QuizResponse";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import CreateGroup from "./Components/CreateGroup/CreateGroup";
import FrontPage from "./Components/Frontpage/Frontpage"
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/home" element={(isAuthenticated)? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <FrontPage />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />

        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route
          path="/createQuiz"
          element={<QuizInput/>}
        />
        <Route
          path="/quiz-submitted"
          element={<QuizSubmitted/>}
        />
        <Route
          path="/all-quizzes"
          element={<QuizAll/>}
        />
        <Route
          path="/attempt-quiz"
          element={<QuizzesList/>}
        />
        <Route
          path="/send-quiz"
          element={<QuizSend/>}
        />
        <Route
          path="/quiz-response"
          element={<QuizResponse/>}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard/>}
        />
        <Route
          path="/create-group"
          element={<CreateGroup/>}
        />
        <Route path="/search" element={<Search />} />
        <Route path='/quiz-success' element={<QuizCreationSuccess/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    {/* {isAuthenticated && <Footer />} */}
    </>
  );
}

export default App;
