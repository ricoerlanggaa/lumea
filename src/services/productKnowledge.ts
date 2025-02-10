'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  CreateProductKnowledgeDTO,
  GetProductKnowledgeDetailResponse,
  GetProductKnowledgeListResponse,
  MetaResponse,
  MetaResponseError,
  ServiceResponse,
  UpdateProductKnowledgeDTO,
} from '@/types/services';

export async function apiGetProductKnowledgeList(): Promise<
  ServiceResponse<GetProductKnowledgeListResponse>
> {
  try {
    const response = await apiClient.get('/v1/knowledge');
    const responseData = response.data as MetaResponse<GetProductKnowledgeListResponse>;
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

export async function apiGetProductKnowledgeDetail(
  id: number,
): Promise<ServiceResponse<GetProductKnowledgeDetailResponse>> {
  try {
    const response = await apiClient.get(`/v1/knowledge/${id}`);
    const responseData = response.data as MetaResponse<GetProductKnowledgeDetailResponse>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
      data: responseData.data,
    };
  } catch (error) {
    const err = error as MetaResponseError<null>;
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

export async function apiCreateProductKnowledge(
  payload: CreateProductKnowledgeDTO,
): Promise<ServiceResponse<null>> {
  try {
    const response = await apiClient.post('/v1/knowledge', payload);
    const responseData = response.data as MetaResponse<null>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError<null>;
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

export async function apiUpdateProductKnowledge(
  payload: UpdateProductKnowledgeDTO,
): Promise<ServiceResponse<null>> {
  try {
    const response = await apiClient.put('/v1/knowledge', payload);
    const responseData = response.data as MetaResponse<null>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError<null>;
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

export async function apiDeleteProductKnowledge(id: number): Promise<ServiceResponse<null>> {
  try {
    const response = await apiClient.delete(`/v1/knowledge/${id}`);
    const responseData = response.data as MetaResponse<null>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError<null>;
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
