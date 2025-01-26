'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/atoms';
import type { FormUserRegisterProps, FormUserRegisterValues } from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { apiUserRegister } from '@/services';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { userRegisterSchema } from '@/utilities/validations/schema';

export default function FormUserRegister({
  value = { fullName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' },
}: FormUserRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserRegisterValues>({
    resolver: ajvResolver(userRegisterSchema),
    mode: 'onSubmit',
    defaultValues: value,
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [state, setState] = useState<FormUserRegisterValues>(value);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormUserRegisterValues> = async (data) => {
    setLoading(true);
    const response = await apiUserRegister({
      name: data.fullName,
      phone_number: data.phoneNumber,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Registrasi berhasil!',
      });
      router.push('/login');
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
        type="text"
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap Anda"
        inputKey="fullName"
        register={register}
        errors={errors}
        value={state.fullName}
        onChange={(e) => setState({ ...state, fullName: e.target.value })}
      />
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
        type="tel"
        label="Nomor Telepon"
        placeholder="Masukkan Nomor Telepon Anda"
        inputKey="phoneNumber"
        register={register}
        errors={errors}
        value={state.phoneNumber}
        onChange={(e) => setState({ ...state, phoneNumber: e.target.value })}
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
      <Input
        type="password"
        label="Konfirmasi Password"
        placeholder="Konfirmasi Password Anda"
        inputKey="confirmPassword"
        register={register}
        errors={errors}
        value={state.confirmPassword}
        onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={loading} width="block">
        Daftar
      </Button>
    </form>
  );
}
