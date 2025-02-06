'use client';

import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/atoms';
import type { FormUserLoginValues } from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import useToast from '@/hooks/useToast';
import { userLoginSchema } from '@/utilities/validations/schema';
import { apiUserLogin } from '@/services';

export default function FormUserLogin() {
  const {
    register,
    formState: { errors, isLoading },
    submitHandler,
  } = useForm<FormUserLoginValues>(userLoginSchema);
  const router = useRouter();
  const { showToast } = useToast();

  const onSubmit = async (data: FormUserLoginValues) => {
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
