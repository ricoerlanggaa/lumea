'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { csAINameValidation, csAIPersonalityValidation } from '@/utilities/validations/schema';
import { Button, Input, TextArea } from '@/components/atoms';
import { createCustomerService, type CreateCustomerServiceDto } from '@/actions/customer-service';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';

const csAiValidationSchema = yup.object().shape({
  csAIName: csAINameValidation,
  csAIPersonality: csAIPersonalityValidation,
});

export default function CSAIForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerServiceDto>({
    resolver: yupResolver(csAiValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<CreateCustomerServiceDto> = async (data) => {
    setLoading(true);
    const response = await createCustomerService(data);
    if (response.status) {
      showToast({
        variant: 'success',
        message: 'Customer Service AI berhasil ditambahkan!',
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
        inputKey="csAIName"
        label="Nama Customer Service AI"
        placeholder="Masukkan Nama Customer Service AI Anda"
        register={register}
        errors={errors}
      />
      <Input
        inputKey="label"
        label="Label (Opsional)"
        placeholder="Masukkan Label Produk Anda"
        register={register}
        errors={errors}
      />
      <TextArea
        inputKey="csAIPersonality"
        label="CS Personality"
        className="h-32"
        register={register}
        errors={errors}
      />
      <Button type="submit" color="black" width="wide" className="mt-2" disabled={loading}>
        Simpan
      </Button>
    </form>
  );
}
