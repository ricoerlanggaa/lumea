'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import apiClient from '@/utilities/http/apiClient';
import type {
  ClientResponse,
  ErrorClientResponse,
  UserAuthToken,
  UserLogin,
  UserRegister,
} from '@/types/services';

export async function apiUserRegister(payload: UserRegister) {
  try {
    const response = await apiClient.post('/v1/user/registration', {
      name: payload.fullName,
      email: payload.email,
      phone_number: payload.phoneNumber,
      password: payload.password,
      confirm_password: payload.confirmPassword,
    });
    const responseData = response.data as ClientResponse<null>;
    const message = responseData.meta?.message || response.statusText;

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiUserLogin(payload: UserLogin) {
  try {
    const response = await apiClient.post('/v1/user/login', {
      email: payload.email,
      password: payload.password,
    });
    const responseData = response.data as ClientResponse<UserAuthToken>;
    const message = responseData.meta?.message || response.statusText;
    const cookieStore = await cookies();

    if (responseData.data) {
      cookieStore.set('access_token', responseData.data.access_token, {
        maxAge: 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: true,
      });
      cookieStore.set('refresh_token', responseData.data.refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: true,
      });
    }

    return { status: true, message, data: responseData.data };
  } catch (error) {
    const err = error as ErrorClientResponse<null>;
    const errorData = err.response?.data;
    const errorMessage = errorData?.meta?.message || err.response?.statusText;

    return { status: false, message: errorMessage, data: errorData?.data };
  }
}

export async function apiUserLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  redirect('/login');
}
