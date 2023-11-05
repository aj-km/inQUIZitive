import axios from 'axios';

export const createQuiz = (quizData) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_QUIZ_REQUEST' });
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/admin/createQuiz', quizData, config);

    dispatch({ 
      type: 'CREATE_QUIZ_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_QUIZ_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
