import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export interface ListWhatsappResponse {
  meta: { message: string; code: number; status: string };
  data: [{ id: number | string; number: string; isConnected: boolean }];
}
export async function getListWhatsapp() {
  try {
    const response = await apiClient.get('whatsapp');
    const { status, statusText, data: responseData } = response;
    const data = responseData as ListWhatsappResponse;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
// export async function generateQRCodeWhatsapp() {}
export async function connectWhatsapp(id: number | string) {
  try {
    const response = await apiClient.get(`/whatsapp/connect/${id}`);
    const { status, statusText, data } = response;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export async function disconnectWhatsapp(id: number | string) {
  try {
    const response = await apiClient.get(`/whatsapp/disconnect/${id}`);
    const { status, statusText, data } = response;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export async function removeWhatsapp(id: number | string) {
  try {
    const response = await apiClient.delete(`/whatsapp/${id}`);
    const { status, statusText, data } = response;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
