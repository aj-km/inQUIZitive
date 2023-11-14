// src/redux/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating a group
export const createGroup = createAsyncThunk('groups/createGroup', async (groupData) => {
  try {
    const response = await axios.post('/groups/create', groupData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups.push(action.payload.group);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default groupsSlice.reducer;
