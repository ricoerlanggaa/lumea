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
  ServiceResponse,
} from '@/types/services';

export async function apiGetCustomerServiceList(): Promise<
  ServiceResponse<GetCustomerServiceListResponse>
> {
  try {
    const response = await apiClient.get('/v1/customer-service');
    const responseData = response.data as MetaResponse<GetCustomerServiceListResponse>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
      data: responseData.data,
    };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
      data: [],
    };
  }
}

export async function apiGetCustomerServiceDetail(
  id: number,
): Promise<ServiceResponse<GetCustomerServiceDetailResponse>> {
  try {
    const response = await apiClient.get(`/v1/customer-service/${id}`);
    const responseData = response.data as MetaResponse<GetCustomerServiceDetailResponse>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
      data: responseData.data,
    };
  } catch (error) {
    const err = error as MetaResponseError;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
    };
  }
}

export async function apiCreateCustomerService(
  payload: CreateCustomerServiceDTO,
): Promise<ServiceResponse> {
  try {
    const response = await apiClient.post('/v1/customer-service', payload);
    const responseData = response.data as MetaResponse;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
    };
  }
}

export async function apiUpdateCustomerService(
  payload: UpdateCustomerServiceDTO,
): Promise<ServiceResponse> {
  try {
    const response = await apiClient.put('/v1/customer-service', payload);
    const responseData = response.data as MetaResponse;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
    };
  }
}

export async function apiDeleteCustomerService(id: number): Promise<ServiceResponse> {
  try {
    const response = await apiClient.delete(`/v1/customer-service/${id}`);
    const responseData = response.data as MetaResponse;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
    };
  }
}

export async function apiGetCustomerServiceSelectList(): Promise<
  ServiceResponse<GetCustomerServiceSelectListResponse>
> {
  try {
    const response = await apiClient.get('/v1/customer-service/list-select');
    const responseData = response.data as MetaResponse<GetCustomerServiceSelectListResponse>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
      data: responseData.data,
    };
  } catch (error) {
    const err = error as MetaResponseError<[]>;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
      data: [],
    };
  }
}
