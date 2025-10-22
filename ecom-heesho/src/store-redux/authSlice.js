// src/store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../services/api';
import { setAuthToken } from '../services/api';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      return data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'error' | 'logged_out'
  error: null,
};

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'logged_out';
      state.error = null;
      setAuthToken(null); // Clear Axios auth header
      localStorage.removeItem('token'); // Optional: clear localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        setAuthToken(action.payload.token); // ✅ set Axios token for future API calls
        localStorage.setItem('token', action.payload.token); // ✅ optional persistence
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
