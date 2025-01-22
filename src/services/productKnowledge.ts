'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  CreateProductKnowledgeDTO,
  GetProductKnowledgeDetailResponse,
  GetProductKnowledgeListResponse,
  MetaResponse,
  MetaResponseError,
  UpdateProductKnowledgeDTO,
} from '@/types/services';

export async function apiGetProductKnowledgeList() {
  try {
    const response = await apiClient.get('/v1/knowledge');
    const responseData = response.data as MetaResponse<GetProductKnowledgeListResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? [] };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: [] };
  }
}

export async function apiGetProductKnowledgeDetail(id: number) {
  try {
    const response = await apiClient.get(`/v1/knowledge/${id}`);
    const responseData = response.data as MetaResponse<GetProductKnowledgeDetailResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiCreateProductKnowledge(payload: CreateProductKnowledgeDTO) {
  try {
    const response = await apiClient.post('/v1/knowledge', payload);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiUpdateProductKnowledge(payload: UpdateProductKnowledgeDTO) {
  try {
    const response = await apiClient.put('/v1/knowledge', payload);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiDeleteProductKnowledge(id: number) {
  try {
    const response = await apiClient.delete(`/v1/knowledge/${id}`);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}
