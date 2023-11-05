import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./Reducers/quizReducer";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    userProfile: userProfileReducer,
    quiz:quizReducer,
  },
});

export default store;
