import axios from 'axios';

export const createQuiz = (quizData) => async (dispatch) => {
  try {
    dispatch({ type: 'CreateQuizRequest' });
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/admin/createQuiz', quizData, config);

    dispatch({ 
      type: 'CreateQuizSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'CreateQuizFailure',
      // payload: error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message,
      payload:error.response.data.message,
    });
  }
};
export const resetCreateQuiz=()=>async(dispatch)=>{
  dispatch({
    type:'ResetQuiz',
  })
}
