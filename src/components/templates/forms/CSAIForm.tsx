'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCSAI } from '@/actions/productSetup';
import { csAINameValidation, csAIPersonalityValidation } from '@/utilities/validations/schema';
import { Button, Input, TextArea } from '@/components/atoms';

interface CSAIFormValues {
  csAIName: string;
  label?: string;
  csAIPersonality: string;
}
const csAiValidationSchema = yup.object().shape({
  csAIName: csAINameValidation,
  csAIPersonality: csAIPersonalityValidation,
});

export default function CSAIForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CSAIFormValues>({
    resolver: yupResolver(csAiValidationSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<CSAIFormValues> = async (data) => {
    setLoading(true);
    await createCSAI<CSAIFormValues>(data);
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
