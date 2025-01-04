'use server';

export async function registerUser<T>(formData: T) {
  console.log(formData);
}

export async function loginUser(formData: FormData) {
  console.log(formData);
}
