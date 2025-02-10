import { ToastShowAction, ToastState, ToastStateItem } from '@/types/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastStateItem>) => {
      state.toasts.push(action.payload);
    },
    deleteToast: (state, action: PayloadAction<string>) => {
      const data = state;
      data.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});
const { addToast, deleteToast } = toastSlice.actions;

export const showToast = createAsyncThunk(
  'toast/showToast',
  async (config: ToastShowAction, { dispatch }) => {
    const id = `${Date.now()}-${Math.random()}`;
    dispatch(addToast({ id, message: config.message, variant: config.variant }));

    if (config.duration) {
      setTimeout(() => {
        dispatch(deleteToast(id));
      }, config.duration);
    }
  },
);

export default toastSlice.reducer;
