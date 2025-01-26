import type { JSONSchemaType } from 'ajv';
import type {
  FormCustomerServiceValues,
  FormProductKnowledgeValues,
  FormUserLoginValues,
  FormUserRegisterValues,
} from '@/types/components/templates';

export const userLoginSchema: JSONSchemaType<FormUserLoginValues> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
      errorMessage: 'Enter a valid email address.',
    },
    password: {
      type: 'string',
      minLength: 6,
      errorMessage: 'Password should have at least 6 characters.',
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

export const userRegisterSchema: JSONSchemaType<FormUserRegisterValues> = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
      minLength: 3,
      errorMessage: 'Full name should have at least 3 characters.',
    },
    phoneNumber: {
      type: 'string',
      minLength: 10,
      maxLength: 15,
      errorMessage: 'Enter a valid phone number.',
    },
    email: {
      type: 'string',
      minLength: 1,
      errorMessage: 'Enter a valid email address.',
    },
    password: {
      type: 'string',
      minLength: 6,
      errorMessage: 'Password should have at least 6 characters.',
    },
    confirmPassword: {
      type: 'string',
      minLength: 6,
      errorMessage: 'Confirm password must match password.',
    },
  },
  required: ['fullName', 'phoneNumber', 'email', 'password', 'confirmPassword'],
  additionalProperties: false,
};

export const customerServiceSchema: JSONSchemaType<FormCustomerServiceValues> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      errorMessage: 'Name should have at least 3 characters.',
    },
    label: {
      type: 'string',
    },
    personality: {
      type: 'string',
      minLength: 100,
      errorMessage: 'Personality should have at least 100 characters.',
    },
  },
  required: ['name', 'personality'],
  additionalProperties: false,
};
export const productKnowledgeSchema: JSONSchemaType<FormProductKnowledgeValues> = {
  type: 'object',
  properties: {
    customerServiceId: {
      type: 'number',
      minLength: 1,
      errorMessage: 'Customer service is required.',
    },
    whatsappId: {
      type: 'string',
      minLength: 1,
      errorMessage: 'Whatsapp is required.',
    },
    label: {
      type: 'string',
    },
    description: {
      type: 'string',
      minLength: 100,
      errorMessage: 'Personality should have at least 100 characters.',
    },
  },
  required: ['customerServiceId', 'whatsappId', 'description'],
  additionalProperties: false,
};
