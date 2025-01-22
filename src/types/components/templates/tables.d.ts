export interface TableProductKnowledgeItem {
  id: number;
  customerServiceName: string;
  whatsappNumber: string;
  label: string;
}
export interface TableProductKnowledgeProps {
  items?: TableProductKnowledgeItem[];
}
export interface TableWhatsappItem {
  id: string;
  number: string;
  status: 'connected' | 'disconnected';
}
export interface TableWhatsappProps {
  items?: TableWhatsappItem[];
}
