'use server';

import apiClient from '@/utilities/http/apiClient';
import { AxiosError } from 'axios';

export interface RegisterUserDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export async function registerUser(user: RegisterUserDto) {
  try {
    const response = await apiClient.post('/user/registration', {
      name: user.fullName,
      email: user.email,
      phone_number: user.phoneNumber,
      password: user.password,
      confirm_password: user.confirmPassword,
    });
    const { status, statusText, data } = response;
    return { status: status >= 200 && status < 300, message: statusText, data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
export interface LoginUserDto {
  email: string;
  password: string;
}
interface LoginUserResponse {
  meta: { message: string; code: number; status: string };
  data: {
    refresh_token: string;
    access_token: string;
  };
}
export async function loginUser(user: LoginUserDto) {
  try {
    const response = await apiClient.post('/user/login', {
      email: user.email,
      password: user.password,
    });
    const { status, statusText, data: responseData } = response;
    const { data } = responseData as LoginUserResponse;
    return {
      status: status >= 200 && status < 300,
      message: statusText,
      data: { accessToken: data.access_token, refreshToken: data.refresh_token },
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: false,
      message: err.response?.statusText,
      data: null,
    };
  }
}
