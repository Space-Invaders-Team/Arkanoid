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
    increaseCount(state) {
      state.tryCount += 1;
    },
  },
});

export const { setScore, increaseCount } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
