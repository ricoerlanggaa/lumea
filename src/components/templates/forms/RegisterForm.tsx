'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/atoms';
import {
  fullNameValidation,
  emailValidation,
  phoneNumberValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '@/utilities/validations/schema';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';
import { apiUserRegister } from '@/services';
import type { UserRegister } from '@/types/services';

const registerValidationSchema = yup.object().shape({
  fullName: fullNameValidation,
  email: emailValidation,
  phoneNumber: phoneNumberValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: yupResolver(registerValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<UserRegister> = async (data) => {
    setLoading(true);
    const response = await apiUserRegister(data);
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
      />
      <Input
        type="email"
        label="Email"
        placeholder="Masukkan Email Anda"
        inputKey="email"
        register={register}
        errors={errors}
      />
      <Input
        type="tel"
        label="Nomor Telepon"
        placeholder="Masukkan Nomor Telepon Anda"
        inputKey="phoneNumber"
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
      <Input
        type="password"
        label="Konfirmasi Password"
        placeholder="Konfirmasi Password Anda"
        inputKey="confirmPassword"
        register={register}
        errors={errors}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={loading} width="block">
        Daftar
      </Button>
    </form>
  );
}
