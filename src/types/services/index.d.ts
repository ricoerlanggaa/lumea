import type { AxiosError } from 'axios';

export interface ClientResponse<T> {
  meta?: { message: string; code: number; status: string };
  data: T;
}
export type ErrorClientResponse<T> = AxiosError<ClientResponse<T>>;

export * from './customerService';
export * from './productKnowledge';
export * from './user';
export * from './whatsapp';
