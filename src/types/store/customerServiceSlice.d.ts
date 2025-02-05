export type CustomerServiceList = {
  id: number;
  name: string;
  label: string;
}[];
export interface CustomerServiceItem {
  id: number;
  name: string;
  label: string;
  personality: string;
}
export interface CustomerServiceCreate {
  name: string;
  label: string;
  personality: string;
}
export interface CustomerServiceUpdate {
  id: number;
  name: string;
  label: string;
  personality: string;
}
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
