'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  GetCodeWhatsappResponse,
  GetWhatsappListResponse,
  GetWhatsappSelectListResponse,
  MetaResponse,
  MetaResponseError,
  ServiceResponse,
} from '@/types/services';

export async function apiGetWhatsappList(): Promise<ServiceResponse<GetWhatsappListResponse>> {
  try {
    const response = await apiClient.get('/v1/whatsapp');
    const responseData = response.data as MetaResponse<GetWhatsappListResponse>;
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

export async function apiGetCodeWhatsapp(
  id: string,
): Promise<ServiceResponse<GetCodeWhatsappResponse | null>> {
  try {
    const response = await apiClient.post('/v1/whatsapp/qr', { id });
    const responseData = response.data as MetaResponse<GetCodeWhatsappResponse>;
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

export async function apiDeleteWhatsapp(id: string): Promise<ServiceResponse> {
  try {
    const response = await apiClient.delete(`/v1/whatsapp/${id}`);
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

export async function apiConnectWhatsapp(id: string): Promise<ServiceResponse> {
  try {
    const response = await apiClient.get(`/v1/whatsapp/connect/${id}`);
    const responseData = response.data as MetaResponse<GetWhatsappListResponse>;
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

export async function apiDisconnectWhatsapp(id: string): Promise<ServiceResponse> {
  try {
    const response = await apiClient.get(`/v1/whatsapp/disconnect/${id}`);
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

export async function apiGetWhatsappSelectList(): Promise<
  ServiceResponse<GetWhatsappSelectListResponse>
> {
  try {
    const response = await apiClient.get('/v1/whatsapp/list-select');
    const responseData = response.data as MetaResponse<GetWhatsappSelectListResponse>;
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
