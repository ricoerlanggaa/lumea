'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  GetCustomerServiceListResponse,
  MetaResponseError,
  MetaResponse,
  GetCustomerServiceDetailResponse,
  CreateCustomerServiceDTO,
  UpdateCustomerServiceDTO,
  GetCustomerServiceSelectListResponse,
} from '@/types/services';

export async function apiGetCustomerServiceList() {
  try {
    const response = await apiClient.get('/v1/customer-service');
    const responseData = response.data as MetaResponse<GetCustomerServiceListResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? [] };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: [] };
  }
}

export async function apiGetCustomerServiceDetail(id: number) {
  try {
    const response = await apiClient.get(`/v1/customer-service/${id}`);
    const responseData = response.data as MetaResponse<GetCustomerServiceDetailResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiCreateCustomerService(payload: CreateCustomerServiceDTO) {
  try {
    const response = await apiClient.post('/v1/customer-service', payload);
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

export async function apiUpdateCustomerService(payload: UpdateCustomerServiceDTO) {
  try {
    const response = await apiClient.put('/v1/customer-service', payload);
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

export async function apiDeleteCustomerService(id: number) {
  try {
    const response = await apiClient.delete(`/v1/customer-service/${id}`);
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

export async function apiGetCustomerServiceSelectList() {
  try {
    const response = await apiClient.get('/v1/customer-service/list-select');
    const responseData = response.data as MetaResponse<GetCustomerServiceSelectListResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? [] };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: [] };
  }
}
