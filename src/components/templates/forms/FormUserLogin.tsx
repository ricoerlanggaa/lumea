'use client';

import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/atoms';
import type { FormUserLoginValues } from '@/types/components/templates';
import { isLoadingState, login } from '@/store/userSlice';
import useForm from '@/hooks/useForm';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { userLoginSchema } from '@/utilities/validations';

export default function FormUserLogin() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingState);

  const {
    register,
    formState: { errors },
    submitHandler,
  } = useForm(userLoginSchema);
  const router = useRouter();

  const onSubmit = async (data: FormUserLoginValues) => {
    const response = await dispatch(login(data)).unwrap();
    if (response.success) {
      router.push('/product-setup/ai-customer-service');
    }
  };
  return (
    <form onSubmit={submitHandler(onSubmit)} noValidate>
      <Input
        type="email"
        label="Email"
        placeholder="Masukkan Email Anda"
        hasError={!!errors.email}
        helperText={errors.email}
        {...register('email')}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Masukkan Password Anda"
        className="mb-4"
        hasError={!!errors.password}
        helperText={errors.password}
        {...register('password')}
      />
      <Button type="submit" color="primary" className="mt-4" disabled={isLoading} shape="block">
        Masuk
      </Button>
    </form>
  );
}
