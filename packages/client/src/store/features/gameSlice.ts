import { createSlice } from '@reduxjs/toolkit';
import { TGameState } from '../typings';

const gameState: TGameState = {
  score: 0,
  tryCount: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: gameState,
  reducers: {
    setScore(state, action) {
      state.score = action.payload;
    },
    increaseTryCount(state) {
      state.tryCount += 1;
    },
  },
});

export const { setScore, increaseTryCount } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
