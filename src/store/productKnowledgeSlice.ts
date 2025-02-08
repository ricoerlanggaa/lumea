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
  async (_, { rejectWithValue }) => {
    const response = await apiGetProductKnowledgeList();
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    const result: ProductKnowledgeList = response.data.map((item) => ({
      id: item.id,
      customerServiceName: item.cs_name,
      whatsappNumber: item.nomor,
      label: item.label,
    }));
    return result;
  },
);
export const fetchItem = createAsyncThunk(
  'productKnowledge/fetchItem',
  async (id: number, { rejectWithValue }) => {
    const response = await apiGetProductKnowledgeDetail(id);
    if (!response.status) {
      return rejectWithValue(response.message);
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
  async (data: ProductKnowledgeCreate, { rejectWithValue }) => {
    const response = await apiCreateProductKnowledge({
      cs_id: data.customerServiceId,
      number_id: data.whatsappId,
      label: data.label,
      description: data.description,
    });
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return data;
  },
);
export const updateItem = createAsyncThunk(
  'productKnowledge/updateItem',
  async (data: ProductKnowledgeUpdate, { rejectWithValue }) => {
    const response = await apiUpdateProductKnowledge({
      id: data.id,
      cs_id: data.customerServiceId,
      number_id: data.whatsappId,
      label: data.label,
      description: data.description,
    });
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return data;
  },
);
export const deleteItem = createAsyncThunk(
  'productKnowledge/deleteItem',
  async (id: number, { rejectWithValue }) => {
    const response = await apiDeleteProductKnowledge(id);
    if (!response.status) {
      return rejectWithValue(response.message);
    }
    return { id };
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
        data.list = action.payload;
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
      .addCase(deleteItem.fulfilled, (state, action) => {
        const data = state;
        data.list = data.list.filter((item) => item.id !== action.payload.id);
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
