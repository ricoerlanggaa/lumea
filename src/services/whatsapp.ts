'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  ClientResponse,
  ErrorClientResponse,
  GenerateCodeWhatsapp,
  WhatsappList,
  WhatsappSelectList,
} from '@/types/services';

export async function apiGetWhatsappList() {
  try {
    const response = await apiClient.get('/v1/whatsapp');
    const responseData = response.data as ClientResponse<WhatsappList>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiGenerateCodeWhatsapp(id: string) {
  try {
    const response = await apiClient.post('/v1/whatsapp/qr', { id });
    const responseData = response.data as ClientResponse<GenerateCodeWhatsapp>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiDeleteWhatsapp(id: string) {
  try {
    const response = await apiClient.delete(`/v1/whatsapp/${id}`);
    const responseData = response.data as ClientResponse<null>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiConnectWhatsapp(id: string) {
  try {
    const response = await apiClient.get(`/v1/whatsapp/connect/${id}`);
    const responseData = response.data as ClientResponse<null>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiDisconnectWhatsapp(id: string) {
  try {
    const response = await apiClient.get(`/v1/whatsapp/disconnect/${id}`);
    const responseData = response.data as ClientResponse<null>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiGetWhatsappSelectList() {
  try {
    const response = await apiClient.get('/v1/whatsapp');
    const responseData = response.data as ClientResponse<WhatsappSelectList>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}
