import * as Yup from 'yup';

export const emailValidation = Yup.string()
  .email('Invalid email address')
  .required('Email is required');

export const passwordValidation = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
  .required('Confirm Password is required');

export const csAINameValidation = Yup.string()
  .min(3, 'Customer Service AI Name must be at least 3 characters')
  .required('Customer Service AI Name is required');

export const csAIPersonalityValidation = Yup.string()
  .min(100, 'CS AI Personality must be at least 100 characters')
  .required('CS AI Personality is required');

export const csAIValidation = Yup.string().required('Customer Service AI is required');

export const noWhatsappValidation = Yup.string().required('Whatsapp Number is required');

export const productKnowledgeValidation = Yup.string()
  .min(100, 'Product Knowledge must be at least 100 characters')
  .required('Product Knowledge is required');
