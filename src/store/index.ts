import { configureStore } from '@reduxjs/toolkit';
import customerServiceReducer from './customerServiceSlice';
import productKnowledgeReducer from './productKnowledgeSlice';
import toastReducer from './toastSlice';
import whatsappReducer from './whatsappSlice';

const store = () => {
  return configureStore({
    reducer: {
      customerService: customerServiceReducer,
      productKnowledge: productKnowledgeReducer,
      toast: toastReducer,
      whatsapp: whatsappReducer,
    },
  });
};

export default store;
