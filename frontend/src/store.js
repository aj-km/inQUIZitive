import { configureStore } from "@reduxjs/toolkit";
import { fetchQuiz, quizListReducer, quizReducer } from "./Reducers/quizReducer";
import { quizSendReducer } from "./Reducers/quizSendReducer";
import {
  allUsersReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    userProfile: userProfileReducer,
    quiz:quizReducer,
    sendQuiz:quizSendReducer,
    allQuizzes:quizListReducer,
    fetchQuiz:fetchQuiz,
  },
});

export default store;
