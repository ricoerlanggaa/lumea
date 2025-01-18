import apiClient from '@/utilities/http/apiClient';
import { AxiosError } from 'axios';

export interface CreateCustomerServiceDto {
  csAIName: string;
  label?: string;
  csAIPersonality: string;
}
export async function createCustomerService(customerService: CreateCustomerServiceDto) {
  try {
    const response = await apiClient.post('/customer-service', {
      name: customerService.csAIName,
      label: customerService.label,
      personality: customerService.csAIPersonality,
    });
    const { status, statusText, data } = response;
    return { status: status >= 200 && status < 300, message: statusText, data };
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
  data: [{ id: number | string; name: string; labels: string }];
}
export async function getListCustomerService() {
  try {
    const response = await apiClient.get('customer-service');
    const { status, statusText, data: responseData } = response;
    const data = responseData as ListCustomerServiceResponse;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export async function deleteCustomerService(id: string | number) {
  try {
    const response = await apiClient.delete(`customer-service/${id}`);
    const { status, statusText, data } = response;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
