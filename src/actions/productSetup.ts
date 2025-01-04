/* eslint-disable import/prefer-default-export */

'use server';

import { redirect } from 'next/navigation';

export async function createCSAI<T>(formData: T) {
  console.log(formData);
  redirect('/product-setup/ai-customer-service');
}
export async function createProductKnowledge<T>(formData: T) {
  console.log(formData);
  redirect('/product-setup/product-knowledge');
}
