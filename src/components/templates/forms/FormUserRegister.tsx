'use client';

import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/atoms';
import type { FormUserRegisterValues } from '@/types/components/templates';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import useForm from '@/hooks/useForm';
import { isLoadingState, register as userRegister } from '@/store/userSlice';
import { userRegisterSchema } from '@/utilities/validations';

export default function FormUserRegister() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingState);

  const {
    register,
    formState: { errors },
    submitHandler,
  } = useForm(userRegisterSchema);
  const router = useRouter();

  const onSubmit = async (data: FormUserRegisterValues) => {
    const response = await dispatch(userRegister(data)).unwrap();
    if (response.success) {
      router.push('/login');
    }
  };
  return (
    <form onSubmit={submitHandler(onSubmit)} noValidate>
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
        className="mb-4"
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
