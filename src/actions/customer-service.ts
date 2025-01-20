'use server';

import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export interface CustomerServiceItem {
  csAIName: string;
  label?: string;
  csAIPersonality: string;
}
export async function createCustomerService(customerService: CustomerServiceItem) {
  try {
    const response = await apiClient.post('/customer-service', {
      name: customerService.csAIName,
      label: customerService.label,
      personality: customerService.csAIPersonality,
    });
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
export async function updateCustomerService(customerService: CustomerServiceItem) {
  try {
    const response = await apiClient.put('/customer-service', {
      name: customerService.csAIName,
      label: customerService.label,
      personality: customerService.csAIPersonality,
    });
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
export interface CustomerServiceListResponse {
  meta: { message: string; code: number; status: string };
  data: [{ id: string; name: string; labels: string }];
}
export async function getCustomerServiceList() {
  try {
    const response = await apiClient.get('/customer-service');
    const { statusText, data: responseData } = response;
    const data = responseData as CustomerServiceListResponse;
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
export interface CustomerServiceSelectListResponse {
  meta: { message: string; code: number; status: string };
  data: [{ id: string; name: string }];
}
export async function getCustomerServiceSelectList() {
  try {
    const response = await apiClient.get('/customer-service/list-select');
    const { statusText, data: responseData } = response;
    const data = responseData as CustomerServiceSelectListResponse;
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
export interface CustomerServiceDetailResponse {
  meta: { message: string; code: number; status: string };
  data: { id: string; name: string; labels: string; personality: string };
}
export async function getCustomerServiceDetail(id: string) {
  try {
    const response = await apiClient.get(`/customer-service/${id}`);
    const { statusText, data: responseData } = response;
    const data = responseData as CustomerServiceDetailResponse;
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
export async function deleteCustomerService(id: string) {
  try {
    const response = await apiClient.delete(`/customer-service/${id}`);
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
