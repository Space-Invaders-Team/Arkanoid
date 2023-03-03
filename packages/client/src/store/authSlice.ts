import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
  },
  reducers: {
    setIsLogged(state, action) {
      state.isLogged = action.payload;
    },
  },
});

export const { setIsLogged } = authSlice.actions;
export default authSlice.reducer;
