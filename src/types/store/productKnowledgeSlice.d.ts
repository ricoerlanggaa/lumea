export type ProductKnowledgeList = {
  id: number;
  customerServiceName: string;
  whatsappNumber: string;
  label: string;
}[];
export interface ProductKnowledgeItem {
  id: number;
  customerServiceId: number;
  whatsappId: string;
  label: string;
  description: string;
}
export type ProductKnowledgeCreate = Omit<ProductKnowledgeItem, 'id'>;
export type ProductKnowledgeUpdate = ProductKnowledgeItem;
export interface ProductKnowledgeState {
  list: ProductKnowledgeList;
  item: ProductKnowledgeItem;
  isLoading: boolean;
}
