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

export const sendQuiz = (userEmail, quizTitle, quizStartDate,quizStartTime,quizEndDate,quizEndTime) => async (dispatch) => {
  try {
    dispatch({ 
      type: 'SendQuizRequest' 
    });

    const response = await axios.post('/api/admin/send', { 
      userEmail,
      quizTitle,
      quizStartDate,
      quizStartTime,
      quizEndDate,
      quizEndTime
    });
    dispatch({ 
      type: 'SendQuizSuccess',
      payload: response.data 
    });
  } catch (error) {
    dispatch({
      type: 'SendQuizFailure',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};



export const getQuizzes = () => async (dispatch) => {
  try {
    dispatch({ 
      type: 'GetQuizzesRequest' });
    const response = await fetch('/api/getAllQuizzes');
    const data = await response.json();
    dispatch({ 
      type: 'GetQuizzesSuccess', 
      payload: data 
    });
  } catch (error) {
    dispatch({
      type: 'GetQuizzesFailure',
      payload: error.message,
    });
  }
};

//New change for leaderboard
export const getLeaderboardQuizzes = () => async (dispatch) => {
  try {
    dispatch({ 
      type: 'GetLeaderboardQuizzesRequest' 
    });
    // const response = await axios.get('/api/getAllQuizzes');
    const response = await axios.get('/api/getLeaderboardQuizzes');
    dispatch({ 
      type: 'GetLeaderboardQuizzesSuccess', 
      payload: response.data 
    });
  } catch (error) {
    dispatch({
      type: 'GetLeaderboardQuizzesFailure',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const setActiveQuiz = (quiz) => async (dispatch) => {
  dispatch({
    type: 'SetActiveQuiz',
    payload: quiz,
  });
};
export const fetchQuizzes = (userId) => async (dispatch) => {
  dispatch({ 
    type: 'FetchQuizRequest' 
  });
  try {
    const response = await fetch(`/api/v1/getUserQuizzes/${userId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json(); // Parse the response data as JSON
    // console.log(data);
    dispatch({ 
      type: 'FetchQuizSuccess', 
      payload: data.quizzes,
    });
  } catch (error) {
    dispatch({ 
      type: 'FetchQuizFailure', 
      payload: error.message, // Use error.message for the error payload
    });
  }
};
export const selectOption = (questionId, selectedOption) => async (dispatch) => {
  dispatch({
    type: 'SelectOption',
    payload: { questionId, selectedOption },
  });
};

export const submitQuizResponses = (userId, quizId, quizResponses, textResponsesArray,timeTaken) => async (dispatch) => {
  dispatch({ 
    type: 'SubmitQuizResponseRequest' 
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Include other headers like authorization if needed
      },
    };
    const { data } = await axios.post('/api/quizzes/submit', { userId, quizId, quizResponses,textResponsesArray, timeTaken }, config);
    dispatch({
      type: 'SubmitQuizResponseSuccess',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'SubmitQuizResponseFailure',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const resetQuizSubmit = () => async(dispatch)=>{
  dispatch({
    type: 'SubmitQuizReset'
  })
}

