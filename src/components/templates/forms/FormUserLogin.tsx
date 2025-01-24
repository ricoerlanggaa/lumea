'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@/components/atoms';
import type { FormUserLoginProps, FormUserLoginValues } from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { emailValidation, passwordValidation } from '@/utilities/validations/schema';
import { apiUserLogin } from '@/services';

const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export default function FormUserLogin({ value }: FormUserLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserLoginValues>({
    resolver: yupResolver(loginValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<FormUserLoginValues>({
    email: value?.email ?? '',
    password: value?.password ?? '',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormUserLoginValues> = async (data) => {
    setLoading(true);
    const response = await apiUserLogin({
      email: data.email,
      password: data.password,
    });
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Login berhasil!',
      });
      router.refresh();
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
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
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Masukkan Password Anda"
        inputKey="password"
        register={register}
        errors={errors}
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={loading} width="block">
        Masuk
      </Button>
    </form>
  );
}
