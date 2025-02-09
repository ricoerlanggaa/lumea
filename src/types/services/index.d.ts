import type { AxiosError } from 'axios';

export interface ServiceResponse<T = unknown> {
  statusCode?: number;
  success: boolean;
  message: string;
  data?: T;
}
export interface MetaResponse<T = unknown> {
  meta: { message: string; code: number; status: string };
  data?: T;
}
export type MetaResponseError<T = unknown> = AxiosError<MetaResponse<T>>;

export * from './customerService';
export * from './productKnowledge';
export * from './user';
export * from './whatsapp';
