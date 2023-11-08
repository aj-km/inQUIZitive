import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const quizReducer = createReducer(initialState, {
  CreateQuizRequest: (state) => {
    state.loading = true;
    state.quizCreated = false;
  },
  CreateQuizSuccess: (state, action) => {
    state.loading = false;
    state.quizDataFromBackend = action.payload;
    state.quizCreated = true;
  },
  CreateQuizFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.quizCreated = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  ResetQuiz: (state) => {
    state.quizCreated = false;
  }
});

const initialState2 = {
  quizzes: []
}
export const quizListReducer = createReducer(initialState2, {
  GetQuizzesRequest: (state) => {
    state.loading = true;
    state.quizzes = [];
  },
  GetQuizzesSuccess: (state, action) => {
    state.loading = false;
    state.quizzes = action.payload;
  },
  GetQuizzesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  SetActiveQuiz: (state, action) => {
    state.activeQuiz = action.payload;
  }

})

const initialState3 = {
  loading: false,
  quizzes: [],
  error: null
}
export const fetchQuiz = createReducer(initialState3, {
  FetchQuizRequest: (state) => {
    state.loading = true;
  },
  FetchQuizSuccess: (state, action) => {
    state.loading = true;
    state.quizzes = action.payload;
  },
  FetchQuizFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  SelectOption: (state, action) => {
    const { quizId, questionId, selectedOption } = action.payload;
    const quizIndex = state.quizzes.findIndex(quiz => quiz._id === quizId);
    if (quizIndex !== -1) {
      const questionIndex = state.quizzes[quizIndex].questions.findIndex(question => question._id === questionId);
      if (questionIndex !== -1) {
        state.quizzes[quizIndex].questions[questionIndex].selectedOption = selectedOption;
      }
    }
  }
});

const initialState4={
  submitLoading: false,
  submitSuccess: false,
  submitError: null
}
export const submitQuizResponses=createReducer(initialState4,{
  SubmitQuizResponseRequest:(state)=>{
    state.submitLoading=true;
    state.submitError=null;
  },
  SubmitQuizResponseSuccess:(state)=>{
    state.submitLoading=false;
    state.submitSuccess=true;
  },
  SubmitQuizResponseFailure:(state,action)=>{
    state.submitLoading=false;
    state.submitSuccess=false;
    state.submitError=action.payload;
  },
  SubmitQuizReset:(state)=>{
    state.submitSuccess=false;
    state.submitLoading=false;
  }
});