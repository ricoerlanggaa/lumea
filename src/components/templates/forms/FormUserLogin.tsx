'use client';

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

  const onSubmit = (data: FormUserLoginValues) => {
    dispatch(login(data));
  };
  return (
    <form onSubmit={submitHandler(onSubmit)}>
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
