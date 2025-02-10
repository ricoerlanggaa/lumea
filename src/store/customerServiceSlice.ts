import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StoreState } from '@/types/hooks/useStore';
import {
  apiCreateCustomerService,
  apiDeleteCustomerService,
  apiGetCustomerServiceDetail,
  apiGetCustomerServiceList,
  apiGetCustomerServiceSelectList,
  apiUpdateCustomerService,
} from '@/services';
import {
  CustomerServiceCreate,
  CustomerServiceItem,
  CustomerServiceList,
  CustomerServiceSelectOptions,
  CustomerServiceState,
  CustomerServiceUpdate,
} from '@/types/store';
import { showToast } from './toastSlice';

const initialState: CustomerServiceState = {
  list: [],
  item: {
    id: 0,
    name: '',
    label: '',
    personality: '',
  },
  selectOptions: [],
  isLoading: false,
};

export const fetchList = createAsyncThunk(
  'customerService/fetchList',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetCustomerServiceList();
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
    const result: CustomerServiceList =
      response.data?.map((item) => ({
        id: +item.id,
        label: item.labels,
        name: item.name,
      })) ?? [];
    return result;
  },
);
export const fetchSelectOptions = createAsyncThunk(
  'customerService/fetchSelectOptions',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetCustomerServiceSelectList();
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
    const result: CustomerServiceSelectOptions =
      response.data?.map((item) => ({
        key: +item.id,
        label: item.name,
        value: +item.id,
      })) ?? [];
    return result;
  },
);
export const fetchItem = createAsyncThunk(
  'customerService/fetchItem',
  async (id: number, { rejectWithValue, dispatch }) => {
    const response = await apiGetCustomerServiceDetail(+id);
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
    const result: CustomerServiceItem = {
      id: response.data?.id ?? 0,
      name: response.data?.labels ?? '',
      label: response.data?.labels ?? '',
      personality: response.data?.personality ?? '',
    };
    return result;
  },
);
export const createItem = createAsyncThunk(
  'customerService/createItem',
  async (item: CustomerServiceCreate, { rejectWithValue, dispatch }) => {
    const response = await apiCreateCustomerService({
      name: item.name,
      label: item.label ?? '',
      personality: item.personality,
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
    const result = { ...response, data: item };
    dispatch(
      showToast({
        variant: 'success',
        message: 'AI Customer Service berhasil ditambahkan!',
        duration: 3000,
      }),
    );

    return result;
  },
);
export const updateItem = createAsyncThunk(
  'customerService/updateItem',
  async (item: CustomerServiceUpdate, { rejectWithValue, dispatch }) => {
    const response = await apiUpdateCustomerService({
      id: +item.id,
      name: item.name,
      label: item.label ?? '',
      personality: item.personality,
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
    const result = { ...response, data: item };
    dispatch(
      showToast({
        variant: 'success',
        message: 'AI Customer Service berhasil diperbarui!',
        duration: 3000,
      }),
    );

    return result;
  },
);
export const deleteItem = createAsyncThunk(
  'customerService/deleteItem',
  async (id: number, { rejectWithValue, dispatch }) => {
    const response = await apiDeleteCustomerService(+id);
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
    const result = { ...response, data: { id: +id } };
    dispatch(
      showToast({
        variant: 'success',
        message: 'AI Customer Service berhasil dihapus!',
        duration: 3000,
      }),
    );

    return result;
  },
);

const customerServiceSlice = createSlice({
  name: 'customerService',
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
        const result = action.payload;

        data.selectOptions = result;
        data.isLoading = false;
      })
      .addCase(fetchSelectOptions.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(fetchItem.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        const data = state;
        data.item = action.payload;
        data.isLoading = false;
      })
      .addCase(fetchItem.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(createItem.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(createItem.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(updateItem.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(updateItem.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(deleteItem.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(deleteItem.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      });
  },
});

export const listState = (state: StoreState) => state.customerService.list;
export const selectOptionsState = (state: StoreState) => state.customerService.selectOptions;
export const itemState = (state: StoreState) => state.customerService.item;
export const isLoadingState = (state: StoreState) => state.customerService.isLoading;

export default customerServiceSlice.reducer;
