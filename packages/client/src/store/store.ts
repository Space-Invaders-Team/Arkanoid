import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/authSlice';
import { gameReducer } from './features/gameSlice';

export const rootReducer = combineReducers({
  // here we will be adding reducers
  // counter: counterReducer,
  auth: authReducer,
  game: gameReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
});

// Use RootState and Dispatch typing inside files that will need this reference.
// Therefore, these definitions are created and exported within the store.ts file.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof setupStore.dispatch;
