'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/atoms';
import type { FormUserLoginProps, FormUserLoginValues } from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { apiUserLogin } from '@/services';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { userLoginSchema } from '@/utilities/validations/schema';

export default function FormUserLogin({ value = { email: '', password: '' } }: FormUserLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserLoginValues>({
    resolver: ajvResolver(userLoginSchema),
    mode: 'onSubmit',
    defaultValues: value,
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [state, setState] = useState<FormUserLoginValues>(value);
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
        value={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Masukkan Password Anda"
        inputKey="password"
        register={register}
        errors={errors}
        value={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={loading} width="block">
        Masuk
      </Button>
    </form>
  );
}
