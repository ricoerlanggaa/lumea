export type WhatsappList = {
  id: string;
  number: string;
  status: 'connected' | 'disconnected';
}[];
export type WhatsappSelectOptions = {
  key: string;
  label: string;
  value: string;
}[];
export interface WhatsappState {
  list: WhatsappList;
  selectOptions: WhatsappSelectOptions;
  code: string;
  codeStatus: 'pending' | 'active' | 'expired' | 'connected';
  remainingExpiredCode: number;
  isLoading: boolean;
}
