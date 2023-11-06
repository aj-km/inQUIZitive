import { createReducer } from "@reduxjs/toolkit";
const initialState={};

export const quizReducer=createReducer(initialState,{
    CreateQuizRequest:(state)=>{
      state.loading=true;
      state.quizCreated=false;
    },
    CreateQuizSuccess:(state,action)=>{
      state.loading=false;
      state.quizDataFromBackend=action.payload;
      state.quizCreated=true;
    },
    CreateQuizFailure:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.quizCreated=false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    ResetQuiz:(state)=>{
      state.quizCreated=false;
    }

});