export interface CardCustomerServiceItem {
  id: number;
  name: string;
  label?: string;
}
export interface CardCustomerServiceProps {
  items?: CardCustomerServiceItem[];
}
