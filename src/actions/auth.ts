'use server';

import { redirect } from 'next/navigation';

export async function registerUser<T>(formData: T) {
  console.log(formData);
  redirect('/login');
}

export async function loginUser<T>(formData: T) {
  console.log(formData);
  redirect('/product-setup/ai-customer-service');
}
