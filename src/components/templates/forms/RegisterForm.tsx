'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/atoms';
import { registerUser } from '@/actions/auth';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from '@/utilities/validations/schema';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
const registerValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValidationSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    await registerUser<RegisterFormValues>(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label="Email"
        placeholder="Masukkan Email Anda"
        inputKey="email"
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
      <Button type="submit" color="primary" className="mt-4" block>
        Daftar
      </Button>
    </form>
  );
}
