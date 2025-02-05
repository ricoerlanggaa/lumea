import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
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
  async (_, { rejectWithValue }) => {
    const response = await apiGetCustomerServiceList();
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result: CustomerServiceList = response.data.map((item) => ({
      id: item.id,
      label: item.labels,
      name: item.name,
    }));
    return result;
  },
);
export const fetchSelectOptions = createAsyncThunk(
  'customerService/fetchSelectOptions',
  async (_, { rejectWithValue }) => {
    const response = await apiGetCustomerServiceSelectList();
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result: CustomerServiceSelectOptions = response.data.map((item) => ({
      key: item.id,
      label: item.name,
      value: item.id,
    }));
    return result;
  },
);
export const fetchItem = createAsyncThunk(
  'customerService/fetchItem',
  async (id: number, { rejectWithValue }) => {
    const response = await apiGetCustomerServiceDetail(id);
    if (!response.status) {
      return rejectWithValue(response.message);
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
  async (item: CustomerServiceCreate, { rejectWithValue }) => {
    const response = await apiCreateCustomerService({
      name: item.name,
      label: item.label,
      personality: item.personality,
    });
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result = { ...item, id: response.data?.id ?? 0 };
    return result;
  },
);
export const updateItem = createAsyncThunk(
  'customerService/updateItem',
  async (item: CustomerServiceUpdate, { rejectWithValue }) => {
    const response = await apiUpdateCustomerService({
      id: +item.id,
      name: item.name,
      label: item.label,
      personality: item.personality,
    });
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return item;
  },
);
export const deleteItem = createAsyncThunk(
  'customerService/deleteItem',
  async (id: number, { rejectWithValue }) => {
    const response = await apiDeleteCustomerService(id);
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return { id };
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
        data.selectOptions = action.payload;
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
      .addCase(createItem.fulfilled, (state, action) => {
        const data = state;
        const { id, name, label } = action.payload;

        data.list.push({ id, name, label });
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
      .addCase(updateItem.fulfilled, (state, action) => {
        const data = state;
        const { id, name, label } = action.payload;
        const index = data.list.findIndex((item) => item.id === id);

        if (index !== -1) {
          data.list[index] = { id, name, label };
        }
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
      .addCase(deleteItem.fulfilled, (state, action) => {
        const data = state;
        const { id } = action.payload;

        data.list = data.list.filter((item) => item.id !== id);
        data.isLoading = false;
      })
      .addCase(deleteItem.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      });
  },
});

export const listState = (state: RootState) => state.customerService.list;
export const selectOptionsState = (state: RootState) => state.customerService.selectOptions;
export const itemState = (state: RootState) => state.customerService.item;
export const isLoadingState = (state: RootState) => state.customerService.isLoading;

export default customerServiceSlice.reducer;
