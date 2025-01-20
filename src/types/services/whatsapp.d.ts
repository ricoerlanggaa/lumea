export interface WhatsappItem {
  id: string;
  number: string;
  isConnected: boolean;
}
export type WhatsappList = WhatsappItem[];
export interface GenerateCodeWhatsapp {
  id: string;
  code: string;
  isConnected: boolean;
}
export type WhatsappSelectList = {
  id: string;
  number: string;
}[];
