'use server';

import { redirect } from 'next/navigation';
import apiClient from '@/utilities/http/apiClient';

export interface RegisterUserDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export async function registerUser(user: RegisterUserDto) {
  return apiClient.post('/user/registration', {
    name: user.fullName,
    email: user.email,
    phone_number: user.phoneNumber,
    password: user.password,
    confirm_password: user.confirmPassword,
  });
}

export async function loginUser<T>(formData: T) {
  console.log(formData);
  redirect('/product-setup/ai-customer-service');
}
