export type ProductKnowledgeList = {
  id: number;
  nomor: string;
  cs_name: number;
  label: number;
  description: string;
}[];
export interface ProductKnowledgeDetail {
  id: number;
  cs_id: number;
  number_id: string;
  description: string;
}
export interface ProductKnowledgeItem {
  customerServiceId: number;
  whatsappId: string;
  label?: string;
  description: string;
}
export type CreateProductKnowledge = ProductKnowledgeItem;
export interface UpdateProductKnowledge extends ProductKnowledgeItem {
  id: number;
}
