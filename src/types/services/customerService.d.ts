export type CustomerServiceList = {
  id: number;
  name: string;
  labels: string;
}[];
export interface CustomerServiceDetail {
  id: number;
  name: string;
  labels?: string;
  personality: string;
}
export interface CustomerServiceItem {
  name: string;
  label?: string;
  personality: string;
}
export type CreateCustomerService = CustomerServiceItem;
export interface UpdateCustomerService extends CustomerServiceItem {
  id: number;
}
export type CustomerServiceSelectList = {
  id: number;
  name: string;
}[];
