export interface FormCustomerServiceValues {
  name: string;
  label: string;
  personality: string;
}
export interface FormCustomerServiceProps {
  action: 'create' | 'update';
  itemId?: number;
}
export interface FormProductKnowledgeValues {
  customerServiceId: number;
  whatsappId: string;
  label: string;
  description: string;
}
export interface FormProductKnowledgeProps {
  action: 'create' | 'update';
  itemId?: number;
}
export interface FormUserLoginValues {
  email: string;
  password: string;
}
export interface FormUserRegisterValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
