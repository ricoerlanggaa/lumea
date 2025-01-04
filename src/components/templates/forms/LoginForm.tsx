'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginUser } from '@/actions/auth';
import { emailValidation, passwordValidation } from '@/utilities/validations/schema';
import { Button, Input } from '@/components/atoms';

interface LoginFormValues {
  email: string;
  password: string;
}
const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await loginUser<LoginFormValues>(data);
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
      <Button type="submit" color="primary" className="mt-4" block>
        Masuk
      </Button>
    </form>
  );
}
