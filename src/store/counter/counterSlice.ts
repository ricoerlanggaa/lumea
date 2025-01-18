import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      const count = state;
      count.value += 1;
    },
    decrement: (state) => {
      const count = state;
      count.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
