import { configureStore } from '@reduxjs/toolkit';
import customerServiceReducer from './customerServiceSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      customerService: customerServiceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
