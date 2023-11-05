import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (quizData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.post('/api/v1/admin/createQuiz', quizData, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Assuming token is stored in user state
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizzes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createQuiz.pending]: (state) => {
      state.status = 'loading';
    },
    [createQuiz.fulfilled]: (state, action) => {
      state.quizzes.push(action.payload);
      state.status = 'succeeded';
    },
    [createQuiz.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'failed';
    },
  },
});

export default quizSlice.reducer;
