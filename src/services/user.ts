'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import apiClient from '@/utilities/http/apiClient';
import type {
  MetaResponse,
  MetaResponseError,
  UserLoginDTO,
  UserLoginResponse,
  UserRegisterDTO,
} from '@/types/services';

export async function apiUserRegister(payload: UserRegisterDTO) {
  try {
    const response = await apiClient.post('/v1/user/registration', payload);
    const responseData = response.data as MetaResponse<null>;
    const message = responseData.meta?.message || response.statusText;
    return { status: true, message, data: null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiUserLogin(payload: UserLoginDTO) {
  try {
    const response = await apiClient.post('/v1/user/login', payload);
    const responseData = response.data as MetaResponse<UserLoginResponse>;
    const message = responseData.meta?.message || response.statusText;

    if (responseData.data) {
      const cookieStore = await cookies();
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
    return { status: true, message, data: responseData.data ?? null };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.meta?.message || err.response?.statusText;
    return { status: false, message: errorMessage, data: null };
  }
}

export async function apiUserLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  redirect('/login');
}
