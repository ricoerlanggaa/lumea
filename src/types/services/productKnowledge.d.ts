export type GetProductKnowledgeListResponse = {
  id: number;
  nomor: string;
  cs_name: string;
  label: string;
}[];
export interface GetProductKnowledgeDetailResponse {
  id: number;
  cs_id: number;
  number_id: string;
  label: string;
  description: string;
}
export interface CreateProductKnowledgeDTO {
  cs_id: number;
  number_id: string;
  label: string;
  description: string;
}
export interface UpdateProductKnowledgeDTO {
  id: number;
  cs_id: number;
  number_id: string;
  label: string;
  description: string;
}
