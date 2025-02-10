export type CustomerServiceList = {
  id: number;
  name: string;
  label: string;
}[];
export interface CustomerServiceItem {
  id: number;
  name: string;
  label?: string;
  personality: string;
}
export type CustomerServiceCreate = Omit<CustomerServiceItem, 'id'>;
export type CustomerServiceUpdate = CustomerServiceItem;
export type CustomerServiceSelectOptions = {
  key: number;
  label: string;
  value: number;
}[];
export interface CustomerServiceState {
  list: CustomerServiceList;
  item: CustomerServiceItem;
  selectOptions: CustomerServiceSelectOptions;
  isLoading: boolean;
}
