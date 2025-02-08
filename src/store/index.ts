import { configureStore } from '@reduxjs/toolkit';
import customerServiceReducer from './customerServiceSlice';
import productKnowledgeReducer from './productKnowledgeSlice';
import whatsappReducer from './whatsappSlice';

const store = () => {
  return configureStore({
    reducer: {
      customerService: customerServiceReducer,
      productKnowledge: productKnowledgeReducer,
      whatsapp: whatsappReducer,
    },
  });
};

export default store;
