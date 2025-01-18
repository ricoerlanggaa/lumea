'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { loginUser, type LoginUserDto } from '@/actions/auth';
import { emailValidation, passwordValidation } from '@/utilities/validations/schema';
import { Button, Input } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';

const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>({
    resolver: yupResolver(loginValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<LoginUserDto> = async (user) => {
    setLoading(true);
    const response = await loginUser(user);
    const { status, data } = response;
    if (status && data?.accessToken && data?.refreshToken) {
      Cookies.set('access_token', data.accessToken);
      Cookies.set('refresh_token', data.refreshToken);
      showToast({
        variant: 'success',
        message: 'Login berhasil!',
        placement: 'bottom-center',
      });
      router.push('/product-setup/ai-customer-service');
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
        placement: 'bottom-center',
      });
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label="Email"
        placeholder="Masukkan Email Anda"
        inputKey="email"
        register={register}
        errors={errors}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Masukkan Password Anda"
        inputKey="password"
        register={register}
        errors={errors}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={loading} width="block">
        Masuk
      </Button>
    </form>
  );
}
