export const quizReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case 'CREATE_QUIZ_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_QUIZ_SUCCESS':
      return { ...state, loading: false, quizzes: [...state.quizzes, action.payload] };
    case 'CREATE_QUIZ_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};