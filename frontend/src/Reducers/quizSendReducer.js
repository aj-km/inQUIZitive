import { createReducer } from "@reduxjs/toolkit";
const initialState={};

export const quizSendReducer=createReducer(initialState,{
    SendQuizRequest:(state)=>{
      state.loading=true;
    },
    SendQuizSuccess:(state)=>{
      state.loading=false;
      state.success=true;
    },
    SendQuizFailure:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    }
});