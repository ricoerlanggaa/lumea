'use server';

import apiClient from '@/utilities/http/apiClient';
import type {
  ClientResponse,
  CreateProductKnowledge,
  ErrorClientResponse,
  ProductKnowledgeDetail,
  ProductKnowledgeList,
  UpdateProductKnowledge,
} from '@/types/services';

export async function apiGetProductKnowledgeList() {
  try {
    const response = await apiClient.get('/v1/knowledge');
    const responseData = response.data as ClientResponse<ProductKnowledgeList>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<[]>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiGetProductKnowledgeDetail(id: number) {
  try {
    const response = await apiClient.get(`/v1/knowledge/${id}`);
    const responseData = response.data as ClientResponse<ProductKnowledgeDetail>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiCreateProductKnowledge(payload: CreateProductKnowledge) {
  try {
    const response = await apiClient.post('/v1/knowledge', {
      cs_id: payload.customerServiceId,
      number_id: payload.whatsappId,
      label: payload.label,
      description: payload.description,
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

export async function apiUpdateProductKnowledge(payload: UpdateProductKnowledge) {
  try {
    const response = await apiClient.put('/v1/knowledge', {
      id: payload.id,
      cs_id: payload.customerServiceId,
      number_id: payload.whatsappId,
      label: payload.label,
      description: payload.description,
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

export async function apiDeleteProductKnowledge(id: number) {
  try {
    const response = await apiClient.delete(`/v1/knowledge/${id}`);
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
