import { configureStore } from "@reduxjs/toolkit";
import { getLeaderboardQuizzes, fetchQuiz, quizListReducer, quizReducer, submitQuizResponses } from "./Reducers/quizReducer";
import { quizSendReducer } from "./Reducers/quizSendReducer";
import groupsReducer from './redux/groupsSlice';

import {
  allUsersReducer,
  forgotReset,
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
    submitQuiz:submitQuizResponses,
    leaderboard: getLeaderboardQuizzes,
    groups: groupsReducer,
    forgotReset:forgotReset,
  },
});

export default store;
