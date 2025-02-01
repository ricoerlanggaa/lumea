'use client';

import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/atoms';
import type { FormUserRegisterProps, FormUserRegisterValues } from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';
import { userRegisterSchema } from '@/utilities/validations/schema';
import { apiUserRegister } from '@/services';

export default function FormUserRegister({
  value = { fullName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' },
}: FormUserRegisterProps) {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm(userRegisterSchema, { defaultValues: value });
  const router = useRouter();
  const { showToast } = useToast();

  const onSubmit = async (data: FormUserRegisterValues) => {
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
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
