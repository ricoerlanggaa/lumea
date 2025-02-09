'use client';

import { Button, Input } from '@/components/atoms';
import type { FormUserRegisterValues } from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import useForm from '@/hooks/useForm';
import { userRegisterSchema } from '@/utilities/validations';
import { apiUserRegister } from '@/services';

export default function FormUserRegister() {
  const {
    register,
    formState: { errors, isLoading },
    submitHandler,
  } = useForm(userRegisterSchema);
  const { showToast } = useToast();

  const onSubmit = async (data: FormUserRegisterValues) => {
    const response = await apiUserRegister({
      name: data.fullName,
      phone_number: data.phoneNumber,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
    if (!response.success) {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
  };
  return (
    <form onSubmit={submitHandler(onSubmit)}>
      <Input
        type="text"
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap Anda"
        hasError={!!errors.fullName}
        helperText={errors.fullName}
        {...register('fullName')}
      />
      <Input
        type="email"
        label="Email"
        placeholder="Masukkan Email Anda"
        hasError={!!errors.email}
        helperText={errors.email}
        {...register('email')}
      />
      <Input
        type="tel"
        label="Nomor Telepon"
        placeholder="Masukkan Nomor Telepon Anda"
        hasError={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        {...register('phoneNumber')}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Masukkan Password Anda"
        hasError={!!errors.password}
        helperText={errors.password}
        {...register('password')}
      />
      <Input
        type="password"
        label="Konfirmasi Password"
        placeholder="Konfirmasi Password Anda"
        hasError={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        {...register('confirmPassword')}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={isLoading} shape="block">
        Daftar
      </Button>
    </form>
  );
}
