'use server';

export async function registerUser<T>(formData: T) {
  console.log(formData);
}

export async function loginUser<T>(formData: T) {
  console.log(formData);
}
