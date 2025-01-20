'use server';

import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export type ProductKnowledgeList = {
  id: string;
  number_id: string;
  cs_id: string;
  cs_name: string;
  number: string;
  description: string;
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
      cs_id: productKnowledge.customerServiceId,
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
export async function updateProductKnowledge(productKnowledge: ProductKnowledgeItem) {
  try {
    const response = await apiClient.put('/knowledge', {
      cs_id: productKnowledge.customerServiceId,
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
