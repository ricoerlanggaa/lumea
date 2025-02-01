import type { JSONSchemaType } from 'ajv';
import type {
  FormCustomerServiceValues,
  FormProductKnowledgeValues,
  FormUserLoginValues,
  FormUserRegisterValues,
} from '@/types/components/templates';

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegExp = /^(\+62|62|0)(8[1-9][0-9]{6,9})$/;

export const userLoginSchema: JSONSchemaType<FormUserLoginValues> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
      pattern: emailRegExp.source,
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
} as const;

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
      minLength: 1,
      pattern: phoneRegExp.source,
      errorMessage: 'Enter a valid phone number.',
    },
    email: {
      type: 'string',
      minLength: 1,
      pattern: emailRegExp.source,
      errorMessage: 'Enter a valid email address.',
    },
    password: {
      type: 'string',
      minLength: 6,
      errorMessage: 'Password should have at least 6 characters.',
    },
    confirmPassword: {
      type: 'string',
      minLength: 1,
      const: {
        $data: '1/password',
      } as unknown as string,
      errorMessage: {
        minLength: 'Confirm password is required.',
        const: 'Confirm password must match password.',
      },
    },
  },
  required: ['fullName', 'phoneNumber', 'email', 'password', 'confirmPassword'],
  additionalProperties: false,
} as const;

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
} as const;

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
      errorMessage: 'Whatsapp number is required.',
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
} as const;
