'use server';

import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export interface WhatsappListResponse {
  meta: { message: string; code: number; status: string };
  data: { id: string; number: string; isConnected: boolean }[];
}
export async function getWhatsappList() {
  try {
    const response = await apiClient.get('whatsapp');
    const { statusText, data: responseData } = response;
    const data = responseData as WhatsappListResponse;
    return { status: true, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
interface GenerateQRCodeResponse {
  meta: { message: string; code: number; status: string };
  data: { id: string; code: string; isConnected: boolean };
}
export async function generateQRCodeWhatsapp() {
  try {
    const response = await apiClient.get('/whatsapp/qr');
    const { statusText, data: responseData } = response;
    const data = responseData as GenerateQRCodeResponse;
    return { status: true, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export async function connectWhatsapp(id: string) {
  try {
    const response = await apiClient.get(`/whatsapp/connect/${id}`);
    const { statusText, data } = response;
    return { status: true, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export async function disconnectWhatsapp(id: string) {
  try {
    const response = await apiClient.get(`/whatsapp/disconnect/${id}`);
    const { statusText, data } = response;
    return { status: true, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export async function deleteWhatsapp(id: string) {
  try {
    const response = await apiClient.delete(`/whatsapp/${id}`);
    const { statusText, data } = response;
    return { status: true, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export interface WhatsappSelectListResponse {
  meta: { message: string; code: number; status: string };
  data: [{ id: string; number: string }];
}
export async function getWhatsappSelectList() {
  try {
    const response = await apiClient.get('/whatsapp/list-select');
    const { statusText, data: responseData } = response;
    const data = responseData as WhatsappSelectListResponse;
    return { status: true, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
