'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  GetCodeWhatsappResponse,
  GetWhatsappListResponse,
  GetWhatsappSelectListResponse,
  MetaResponse,
  MetaResponseError,
} from '@/types/services';

export async function apiGetWhatsappList() {
  try {
    const response = await apiClient.get('/v1/whatsapp');
    const responseData = response.data as MetaResponse<GetWhatsappListResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? [] };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: [] };
  }
}

export async function apiGetCodeWhatsapp(id: string) {
  try {
    const response = await apiClient.post('/v1/whatsapp/qr', { id });
    const responseData = response.data as MetaResponse<GetCodeWhatsappResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiDeleteWhatsapp(id: string) {
  try {
    const response = await apiClient.delete(`/v1/whatsapp/${id}`);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiConnectWhatsapp(id: string) {
  try {
    const response = await apiClient.get(`/v1/whatsapp/connect/${id}`);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiDisconnectWhatsapp(id: string) {
  try {
    const response = await apiClient.get(`/v1/whatsapp/disconnect/${id}`);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiGetWhatsappSelectList() {
  try {
    const response = await apiClient.get('/v1/whatsapp/list-select');
    const responseData = response.data as MetaResponse<GetWhatsappSelectListResponse>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: responseData.data ?? [] };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: [] };
  }
}
