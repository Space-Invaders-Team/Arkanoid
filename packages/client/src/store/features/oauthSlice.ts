import { createSlice } from '@reduxjs/toolkit';

const oauthSlice = createSlice({
  name: 'oauth',
  initialState: {
    serviceId: null,
  },
  reducers: {
    setServiceId(state, action) {
      state.serviceId = action.payload;
    },
  },
});

export const { setServiceId } = oauthSlice.actions;
export const oauthReducer = oauthSlice.reducer;
