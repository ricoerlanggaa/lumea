import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { StoreState } from '@/types/hooks/useStore';
import {
  apiCreateProductKnowledge,
  apiDeleteProductKnowledge,
  apiGetProductKnowledgeDetail,
  apiGetProductKnowledgeList,
  apiUpdateProductKnowledge,
} from '@/services';
import {
  ProductKnowledgeCreate,
  ProductKnowledgeItem,
  ProductKnowledgeList,
  ProductKnowledgeState,
  ProductKnowledgeUpdate,
} from '@/types/store';
import { showToast } from './toastSlice';

const initialState: ProductKnowledgeState = {
  list: [],
  item: {
    id: 0,
    customerServiceId: 0,
    whatsappId: '',
    label: '',
    description: '',
  },
  isLoading: false,
};

export const fetchList = createAsyncThunk(
  'productKnowledge/fetchList',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await apiGetProductKnowledgeList();
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
    const result: ProductKnowledgeList =
      response.data?.map((item) => ({
        id: item.id,
        customerServiceName: item.cs_name,
        whatsappNumber: item.nomor,
        label: item.label,
      })) ?? [];
    return result;
  },
);
export const fetchItem = createAsyncThunk(
  'productKnowledge/fetchItem',
  async (id: number, { rejectWithValue, dispatch }) => {
    const response = await apiGetProductKnowledgeDetail(id);
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
    const result: ProductKnowledgeItem = {
      id: response.data?.id ?? 0,
      customerServiceId: response.data?.cs_id ?? 0,
      whatsappId: response.data?.number_id ?? '',
      label: response.data?.label ?? '',
      description: response.data?.description ?? '',
    };
    return result;
  },
);
export const createItem = createAsyncThunk(
  'productKnowledge/createItem',
  async (item: ProductKnowledgeCreate, { rejectWithValue, dispatch }) => {
    const response = await apiCreateProductKnowledge({
      cs_id: item.customerServiceId,
      number_id: item.whatsappId,
      label: item.label ?? '',
      description: item.description,
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
    return result;
  },
);
export const updateItem = createAsyncThunk(
  'productKnowledge/updateItem',
  async (item: ProductKnowledgeUpdate, { rejectWithValue, dispatch }) => {
    const response = await apiUpdateProductKnowledge({
      id: item.id,
      cs_id: item.customerServiceId,
      number_id: item.whatsappId,
      label: item.label ?? '',
      description: item.description,
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
    return result;
  },
);
export const deleteItem = createAsyncThunk(
  'productKnowledge/deleteItem',
  async (id: number, { rejectWithValue, dispatch }) => {
    const response = await apiDeleteProductKnowledge(+id);
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

const productKnowledgeSlice = createSlice({
  name: 'productKnowledge',
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
        const result = action.payload;

        data.list = result;
        data.isLoading = false;
      })
      .addCase(fetchList.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      })
      .addCase(fetchItem.pending, (state) => {
        const data = state;
        data.isLoading = true;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;

        data.item = result;
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
      .addCase(deleteItem.fulfilled, (state, action) => {
        const data = state;
        const result = action.payload;
        data.list = data.list.filter((item) => item.id !== result.data.id);
        data.isLoading = false;
      })
      .addCase(deleteItem.rejected, (state) => {
        const data = state;
        data.isLoading = false;
      });
  },
});

export const listState = (state: StoreState) => state.productKnowledge.list;
export const itemState = (state: StoreState) => state.productKnowledge.item;
export const isLoadingState = (state: StoreState) => state.productKnowledge.isLoading;

export default productKnowledgeSlice.reducer;
