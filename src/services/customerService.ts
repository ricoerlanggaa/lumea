'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  ClientResponse,
  CreateCustomerService,
  CustomerServiceDetail,
  CustomerServiceList,
  CustomerServiceSelectList,
  ErrorClientResponse,
  UpdateCustomerService,
} from '@/types/services';

export async function apiGetCustomerServiceList() {
  try {
    const response = await apiClient.get('/v1/customer-service');
    const responseData = response.data as ClientResponse<CustomerServiceList>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiGetCustomerServiceDetail(id: number) {
  try {
    const response = await apiClient.get(`/v1/customer-service/${id}`);
    const responseData = response.data as ClientResponse<CustomerServiceDetail>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiCreateCustomerService(payload: CreateCustomerService) {
  try {
    const response = await apiClient.post('/v1/customer-service', {
      name: payload.name,
      label: payload.label,
      personality: payload.personality,
    });
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

export async function apiUpdateCustomerService(payload: UpdateCustomerService) {
  try {
    const response = await apiClient.put('/v1/customer-service', {
      id: +payload.id,
      name: payload.name,
      label: payload.label,
      personality: payload.personality,
    });
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

export async function apiDeleteCustomerService(id: number) {
  try {
    const response = await apiClient.delete(`/v1/customer-service/${id}`);
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

export async function apiGetCustomerServiceSelectList() {
  try {
    const response = await apiClient.get('/v1/customer-service/list-select');
    const responseData = response.data as ClientResponse<CustomerServiceSelectList>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}
