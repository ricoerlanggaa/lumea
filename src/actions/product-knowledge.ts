'use server';

import type { AxiosError } from 'axios';
import apiClient from '@/utilities/http/apiClient';

export type ListProductKnowledge = {
  id: string;
  number_id: string;
  cs_id: string;
  cs_name: string;
  number: string;
  description: string;
}[];
interface ListProductKnowledgeResponse {
  meta: { message: string; code: number; status: string };
  data: ListProductKnowledge;
}
export async function getListProductKnowledge() {
  try {
    const response = await apiClient.get('/knowledge');
    const { statusText, data: responseData } = response;
    const data = responseData as ListProductKnowledgeResponse;
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
