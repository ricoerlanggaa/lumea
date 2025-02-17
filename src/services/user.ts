'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import apiClient from '@/utilities/http/apiClient';
import type {
  MetaResponse,
  MetaResponseError,
  ServiceResponse,
  UserLoginDTO,
  UserLoginResponse,
  UserRegisterDTO,
} from '@/types/services';

export async function apiUserLogin(
  payload: UserLoginDTO,
): Promise<ServiceResponse<UserLoginResponse>> {
  try {
    const response = await apiClient.post('/v1/user/login', payload);
    const responseData = response.data as MetaResponse<UserLoginResponse>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

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

      return {
        statusCode: response.status,
        success: true,
        message: responseMessage,
      };
    }

    throw new Error('Auth token not found!');
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? (error as string);

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
    };
  }
}

export async function apiUserRegister(payload: UserRegisterDTO): Promise<ServiceResponse<null>> {
  try {
    const response = await apiClient.post('/v1/user/registration', payload);
    const responseData = response.data as MetaResponse<null>;
    const responseMessage = responseData.meta?.message ?? response.statusText;

    return {
      statusCode: response.status,
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    const err = error as MetaResponseError<null>;
    const errorResponse = err.response;
    const errorData = errorResponse?.data ?? null;
    const errorMessage = errorData?.meta?.message ?? errorResponse?.statusText ?? '';

    return {
      statusCode: errorResponse?.status,
      success: false,
      message: errorMessage,
    };
  }
}

export async function apiUserLogout(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  redirect('/login');
}
