import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/AuthAPI';

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getUser();
      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    isLogged: false,
    status: 'loading',
    error: null,
  },
  reducers: {
    setIsLogged(state, action) {
      state.isLogged = action.payload;
    },
    clearAuthStore(state) {
      state.isLogged = false;
      state.userData = null;
      state.status = 'rejected';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.status = 'resolved';
          state.userData = action.payload;
          state.isLogged = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'rejected';
          state.userData = null;
          state.error = action.payload;
          localStorage.removeItem('isLogged');
        },
      );
  },
});

export const { setIsLogged, clearAuthStore } = authSlice.actions;
export default authSlice.reducer;
