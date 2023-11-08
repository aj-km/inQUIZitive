import { configureStore } from "@reduxjs/toolkit";
import { fetchQuiz, quizListReducer, quizReducer, submitQuizResponses } from "./Reducers/quizReducer";
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
    submitQuiz:submitQuizResponses
  },
});

export default store;
