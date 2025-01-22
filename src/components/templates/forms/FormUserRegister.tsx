'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@/components/atoms';
import type { FormUserRegisterProps, FormUserRegisterValues } from '@/types/components/templates';
import {
  fullNameValidation,
  emailValidation,
  phoneNumberValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '@/utilities/validations/schema';
import useToast from '@/hooks/useToast';
import { apiUserRegister } from '@/services';

const registerValidationSchema = yup.object().shape({
  fullName: fullNameValidation,
  email: emailValidation,
  phoneNumber: phoneNumberValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export default function FormUserRegister({ value }: FormUserRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserRegisterValues>({
    resolver: yupResolver(registerValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<FormUserRegisterValues>({
    fullName: value?.fullName ?? '',
    phoneNumber: value?.phoneNumber ?? '',
    email: value?.email ?? '',
    password: value?.password ?? '',
    confirmPassword: value?.confirmPassword ?? '',
  });
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
        placement: 'bottom-center',
      });
      router.push('/login');
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
        type="text"
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap Anda"
        inputKey="fullName"
        register={register}
        errors={errors}
        value={user.fullName}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
      />
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
        type="tel"
        label="Nomor Telepon"
        placeholder="Masukkan Nomor Telepon Anda"
        inputKey="phoneNumber"
        register={register}
        errors={errors}
        value={user.phoneNumber}
        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
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
      <Input
        type="password"
        label="Konfirmasi Password"
        placeholder="Konfirmasi Password Anda"
        inputKey="confirmPassword"
        register={register}
        errors={errors}
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={loading} width="block">
        Daftar
      </Button>
    </form>
  );
}
