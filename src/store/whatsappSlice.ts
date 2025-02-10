import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StoreState } from '@/types/hooks/useStore';
import { WhatsappList, WhatsappSelectOptions, WhatsappState } from '@/types/store/whatsappSlice';
import {
  apiConnectWhatsapp,
  apiDeleteWhatsapp,
  apiDisconnectWhatsapp,
  apiGetCodeWhatsapp,
  apiGetWhatsappList,
  apiGetWhatsappSelectList,
} from '@/services';
import { showToast } from './toastSlice';

const TOTAL_REFRESHED_CODE = 20;

const initialState: WhatsappState = {
  list: [],
  selectOptions: [],
  code: '',
  codeStatus: 'pending',
  remainingExpiredCode: TOTAL_REFRESHED_CODE,
  isLoading: false,
};
let interval: ReturnType<typeof setInterval> | null = null;

export const fetchList = createAsyncThunk(
  'whatsapp/fetchList',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetWhatsappList();
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
    const result: WhatsappList =
      response.data?.map((item) => ({
        id: item.id,
        number: item.number,
        status: item.isConnected ? 'connected' : 'disconnected',
      })) ?? [];
    return result;
  },
);
export const fetchSelectOptions = createAsyncThunk(
  'whatsapp/fetchSelectOptions',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetWhatsappSelectList();
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
    const result: WhatsappSelectOptions =
      response.data?.map((item) => ({
        key: item.id,
        label: item.number,
        value: item.id,
      })) ?? [];
    return result;
  },
);
const refreshCode = createAsyncThunk(
  'whatsapp/refreshCode',
  async (id: string, { rejectWithValue, getState, dispatch }) => {
    const response = await apiGetCodeWhatsapp(id);
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
    const result = {
      ...response,
      data: {
        id: response.data?.id ?? '',
        code: response.data?.code ?? '',
        isConnected: !!response.data?.isConnected,
      },
    };
    const state = (getState() as StoreState).whatsapp;
    if (interval && (result.data.isConnected || state.remainingExpiredCode < 1)) {
      clearInterval(interval);
    }
    return result;
  },
);
export const generateCode = createAsyncThunk(
  'whatsapp/generateCode',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetCodeWhatsapp('');
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
    const result = {
      ...response,
      data: {
        id: response.data?.id ?? '',
        code: response.data?.code ?? '',
        isConnected: !!response.data?.isConnected,
      },
    };

    interval = setInterval(() => dispatch(refreshCode(result.data.id)), 15000);

    return result;
  },
);
export const connectNumber = createAsyncThunk(
  'whatsapp/connectNumber',
  async (id: string, { rejectWithValue, dispatch }) => {
    const response = await apiConnectWhatsapp(id);
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
    const result = { ...response, data: { id } };
    return result;
  },
);
export const disconnectNumber = createAsyncThunk(
  'whatsapp/disconnectNumber',
  async (id: string, { rejectWithValue, dispatch }) => {
    const response = await apiDisconnectWhatsapp(id);
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
    const result = { ...response, data: { id } };
    return result;
  },
);
export const deleteNumber = createAsyncThunk(
  'whatsapp/deleteNumber',
  async (id: string, { rejectWithValue, dispatch }) => {
    const response = await apiDeleteWhatsapp(id);
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
    const result = { ...response, data: { id } };
    return result;
  },
);

const whatsappSlice = createSlice({
  name: 'whatsapp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        const data = state;
        data.list = action.payload;
        data.isLoading = false;
      })
      .addCase(fetchList.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(fetchSelectOptions.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(fetchSelectOptions.fulfilled, (state, action) => {
        const data = state;
        data.selectOptions = action.payload;
        data.isLoading = false;
      })
      .addCase(fetchSelectOptions.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(refreshCode.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;

        if (data.remainingExpiredCode > 0 && !result.data.isConnected) {
          data.code = result.data.code;
          data.remainingExpiredCode -= 1;
        } else if (result.data.isConnected) {
          data.codeStatus = 'connected';
        } else {
          data.codeStatus = 'expired';
          data.code = '';
          data.remainingExpiredCode = TOTAL_REFRESHED_CODE;
        }
      })
      .addCase(refreshCode.rejected, (state) => {
        const data = state;
        data.codeStatus = 'expired';
        data.code = '';
        data.remainingExpiredCode = TOTAL_REFRESHED_CODE;
      })
      .addCase(generateCode.pending, (state) => {
        const data = state;
        data.codeStatus = 'pending';
      })
      .addCase(generateCode.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;

        if (data.remainingExpiredCode > 0 && !result.data.isConnected) {
          data.codeStatus = 'active';
          data.code = result.data.code;
          data.remainingExpiredCode -= 1;
        } else if (result.data.isConnected) {
          data.codeStatus = 'connected';
        } else {
          data.codeStatus = 'expired';
          data.code = '';
          data.remainingExpiredCode = TOTAL_REFRESHED_CODE;
        }
      })
      .addCase(generateCode.rejected, (state) => {
        const data = state;
        data.codeStatus = 'expired';
        data.code = '';
        data.remainingExpiredCode = TOTAL_REFRESHED_CODE;
      })
      .addCase(connectNumber.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(connectNumber.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;
        const index = data.list.findIndex((item) => item.id === result.data.id);

        if (index !== -1) {
          data.list[index] = { ...data.list[index], status: 'connected' };
        }
        data.isLoading = false;
      })
      .addCase(connectNumber.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(disconnectNumber.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(disconnectNumber.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;
        const index = data.list.findIndex((item) => item.id === result.data.id);

        if (index !== -1) {
          data.list[index] = { ...data.list[index], status: 'disconnected' };
        }
        data.isLoading = false;
      })
      .addCase(disconnectNumber.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(deleteNumber.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(deleteNumber.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;

        data.list = data.list.filter((item) => item.id !== result.data.id);
        data.isLoading = false;
      })
      .addCase(deleteNumber.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      });
  },
});

export const listState = (state: StoreState) => state.whatsapp.list;
export const codeState = (state: StoreState) => state.whatsapp.code;
export const codeStatusState = (state: StoreState) => state.whatsapp.codeStatus;
export const selectOptionsState = (state: StoreState) => state.whatsapp.selectOptions;

export default whatsappSlice.reducer;
