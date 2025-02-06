import { configureStore } from '@reduxjs/toolkit';
import customerServiceReducer from './customerServiceSlice';
import productKnowledgeReducer from './productKnowledgeSlice';
import whatsappReducer from './whatsappSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      customerService: customerServiceReducer,
      productKnowledge: productKnowledgeReducer,
      whatsapp: whatsappReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
