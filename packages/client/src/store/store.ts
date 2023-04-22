import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/authSlice';
import { oauthReducer } from './features/oauthSlice';
import { gameReducer } from './features/gameSlice';
import { isSSR } from '../utils/isSSR';

export const rootReducer = combineReducers({
  // here we will be adding reducers
  // counter: counterReducer,
  auth: authReducer,
  oauth: oauthReducer,
  game: gameReducer,
});

export const setupStore = () => {
  const preloadedState = isSSR() ? {} : window.__INITIAL_STATE__;

  if (!isSSR()) {
    delete window.__INITIAL_STATE__;
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Use RootState and Dispatch typing inside files that will need this reference.
// Therefore, these definitions are created and exported within the store.ts file.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
