'use client';

import { Button, Input } from '@/components/atoms';
import type { FormUserLoginValues } from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import { userLoginSchema } from '@/utilities/validations';
import { apiUserLogin } from '@/services';

export default function FormUserLogin() {
  const {
    register,
    formState: { errors, isLoading },
    submitHandler,
  } = useForm<FormUserLoginValues>(userLoginSchema);

  const onSubmit = (data: FormUserLoginValues) => {
    apiUserLogin({
      email: data.email,
      password: data.password,
    });
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
