import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  // here we will be adding reducers
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
