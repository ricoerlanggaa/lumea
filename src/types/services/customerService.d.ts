export type GetCustomerServiceListResponse = {
  id: number;
  name: string;
  labels: string;
}[];
export interface GetCustomerServiceDetailResponse {
  id: number;
  name: string;
  labels?: string;
  personality: string;
}
export interface CreateCustomerServiceDTO {
  name: string;
  label?: string;
  personality: string;
}
export interface UpdateCustomerServiceDTO {
  id: number;
  name: string;
  label?: string;
  personality: string;
}
export type GetCustomerServiceSelectListResponse = {
  id: number;
  name: string;
}[];
