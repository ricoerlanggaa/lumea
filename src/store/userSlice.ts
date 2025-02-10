import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StoreState } from '@/types/hooks/useStore';
import type { UserLogin, UserRegister, UserState } from '@/types/store';
import { apiUserLogin, apiUserRegister } from '@/services';
import { showToast } from './toastSlice';

const initialState: UserState = {
  isLoading: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (user: UserLogin, { rejectWithValue, dispatch }) => {
    const response = await apiUserLogin({
      email: user.email,
      password: user.password,
    });
    const responseCode = response?.statusCode ?? 400;
    if (!response.success) {
      const isClientError = responseCode >= 400 && responseCode < 500;
      dispatch(
        showToast({
          variant: isClientError ? 'warning' : 'error',
          message: response.message,
          duration: 3000,
        }),
      );
      return rejectWithValue(response);
    }
    const result = { ...response, data: user };

    return result;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (user: UserRegister, { rejectWithValue, dispatch }) => {
    const response = await apiUserRegister({
      name: user.fullName,
      phone_number: user.phoneNumber,
      email: user.email,
      password: user.password,
      confirm_password: user.confirmPassword,
    });
    const responseCode = response?.statusCode ?? 400;
    if (!response.success) {
      const isClientError = responseCode >= 400 && responseCode < 500;
      dispatch(
        showToast({
          variant: isClientError ? 'warning' : 'error',
          message: response.message,
          duration: 3000,
        }),
      );
      return rejectWithValue(response);
    }
    const result = { ...response, data: user };

    return result;
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      });
  },
});

export const isLoadingState = (state: StoreState) => state.user.isLoading;

export default userSlice.reducer;
