import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { WhatsappList, WhatsappSelectOptions, WhatsappState } from '@/types/store/whatsappSlice';
import {
  apiConnectWhatsapp,
  apiDeleteWhatsapp,
  apiDisconnectWhatsapp,
  apiGetCodeWhatsapp,
  apiGetWhatsappList,
  apiGetWhatsappSelectList,
} from '@/services';

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

export const fetchList = createAsyncThunk('whatsapp/fetchList', async (_, { rejectWithValue }) => {
  const response = await apiGetWhatsappList();
  if (!response.status) {
    return rejectWithValue(response.message);
  }
  const result: WhatsappList = response.data.map((item) => ({
    id: item.id,
    number: item.number,
    status: item.isConnected ? 'connected' : 'disconnected',
  }));
  return result;
});
export const fetchSelectOptions = createAsyncThunk(
  'whatsapp/fetchSelectOptions',
  async (_, { rejectWithValue }) => {
    const response = await apiGetWhatsappSelectList();
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result: WhatsappSelectOptions = response.data.map((item) => ({
      key: item.id,
      label: item.number,
      value: item.id,
    }));
    return result;
  },
);
const refreshCode = createAsyncThunk(
  'whatsapp/refreshCode',
  async (id: string, { rejectWithValue, getState }) => {
    const response = await apiGetCodeWhatsapp(id);
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result = {
      id: response.data?.id ?? '',
      code: response.data?.code ?? '',
      isConnected: !!response.data?.isConnected,
    };
    const state = (getState() as RootState).whatsapp;
    if (interval && (result.isConnected || state.remainingExpiredCode < 1)) {
      clearInterval(interval);
    }
    return result;
  },
);
export const generateCode = createAsyncThunk(
  'whatsapp/generateCode',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetCodeWhatsapp('');
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result = {
      id: response.data?.id ?? '',
      code: response.data?.code ?? '',
      isConnected: !!response.data?.isConnected,
    };

    interval = setInterval(() => dispatch(refreshCode(result.id)), 15000);

    return result;
  },
);
export const connectNumber = createAsyncThunk(
  'whatsapp/connectNumber',
  async (id: string, { rejectWithValue }) => {
    const response = await apiConnectWhatsapp(id);
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return { id };
  },
);
export const disconnectNumber = createAsyncThunk(
  'whatsapp/disconnectNumber',
  async (id: string, { rejectWithValue }) => {
    const response = await apiDisconnectWhatsapp(id);
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return { id };
  },
);
export const deleteNumber = createAsyncThunk(
  'whatsapp/deleteNumber',
  async (id: string, { rejectWithValue }) => {
    const response = await apiDeleteWhatsapp(id);
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return { id };
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
      .addCase(refreshCode.pending, (state) => {
        const data = state;
        data.codeStatus = 'pending';
      })
      .addCase(refreshCode.fulfilled, (state, action) => {
        const data = state;
        if (data.remainingExpiredCode > 0 && !action.payload.isConnected) {
          data.codeStatus = 'active';
          data.code = action.payload.code;
          data.remainingExpiredCode -= 1;
        } else if (action.payload.isConnected) {
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
        if (data.remainingExpiredCode > 0 && !action.payload.isConnected) {
          data.codeStatus = 'active';
          data.code = action.payload.code;
          data.remainingExpiredCode -= 1;
        } else if (action.payload.isConnected) {
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
        const index = data.list.findIndex((item) => item.id === action.payload.id);

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
        const index = data.list.findIndex((item) => item.id === action.payload.id);

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

        data.list = data.list.filter((item) => item.id !== action.payload.id);
        data.isLoading = false;
      })
      .addCase(deleteNumber.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      });
  },
});

export const listState = (state: RootState) => state.whatsapp.list;
export const codeState = (state: RootState) => state.whatsapp.code;
export const codeStatusState = (state: RootState) => state.whatsapp.codeStatus;
export const selectOptionsState = (state: RootState) => state.whatsapp.selectOptions;

export default whatsappSlice.reducer;
