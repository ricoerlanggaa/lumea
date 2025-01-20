'use server';

import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export type ProductKnowledgeList = {
  id: string;
  cs_name: string;
  nomor: string;
  label: string;
}[];
interface ProductKnowledgeListResponse {
  meta: { message: string; code: number; status: string };
  data: ProductKnowledgeList;
}
export async function getProductKnowledgeList() {
  try {
    const response = await apiClient.get('/knowledge');
    const { statusText, data: responseData } = response;
    const data = responseData as ProductKnowledgeListResponse;
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
interface ProductKnowledgeDetail {
  meta: { message: string; code: 200; status: string };
  data: { id: string; cs_id: string; number_id: string; description: string };
}
export async function getProductKnowledgeDetail(id: number) {
  try {
    const response = await apiClient.get(`/knowledge/${id}`);
    const { statusText, data: responseData } = response;
    const data = responseData as ProductKnowledgeDetail;
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
export async function deleteProductKnowledge(id: string) {
  try {
    const response = await apiClient.delete(`/knowledge/${id}`);
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
export interface ProductKnowledgeItem {
  customerServiceId: string;
  whatsappId: string;
  description: string;
}
export async function createProductKnowledge(productKnowledge: ProductKnowledgeItem) {
  try {
    const response = await apiClient.post('/knowledge', {
      cs_id: +productKnowledge.customerServiceId,
      number_id: productKnowledge.whatsappId,
      description: productKnowledge.description,
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
export async function updateProductKnowledge(id: number, productKnowledge: ProductKnowledgeItem) {
  try {
    const response = await apiClient.put('/knowledge', {
      id,
      cs_id: +productKnowledge.customerServiceId,
      number_id: productKnowledge.whatsappId,
      description: productKnowledge.description,
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
