'use server';

import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export interface CustomerService {
  csAIName: string;
  label?: string;
  csAIPersonality: string;
}
export async function createCustomerService(customerService: CustomerService) {
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
export async function updateCustomerService(customerService: CustomerService) {
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
export interface ListCustomerServiceResponse {
  meta: { message: string; code: number; status: string };
  data: [{ id: string; name: string; labels: string }];
}
export async function getListCustomerService() {
  try {
    const response = await apiClient.get('customer-service');
    const { statusText, data: responseData } = response;
    const data = responseData as ListCustomerServiceResponse;
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
export interface DetailCustomerServiceResponse {
  meta: { message: string; code: number; status: string };
  data: { id: string; name: string; labels: string; personality: string };
}
export async function getDetailCustomerService(id: string) {
  try {
    const response = await apiClient.get(`customer-service/${id}`);
    const { statusText, data: responseData } = response;
    const data = responseData as DetailCustomerServiceResponse;
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
    const response = await apiClient.delete(`customer-service/${id}`);
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
