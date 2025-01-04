'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProductKnowledge } from '@/actions/productSetup';
import {
  csAIValidation,
  noWhatsappValidation,
  productKnowledgeValidation,
} from '@/utilities/validations/schema';
import { Button, Select, TextArea } from '@/components/atoms';

interface ProductKnowledgeFormValues {
  csAI: string;
  noWhatsapp: string;
  productKnowledge: string;
}
const productKnowledgeValidationSchema = yup.object().shape({
  csAI: csAIValidation,
  noWhatsapp: noWhatsappValidation,
  productKnowledge: productKnowledgeValidation,
});

export default function CSAIForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductKnowledgeFormValues>({
    resolver: yupResolver(productKnowledgeValidationSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<ProductKnowledgeFormValues> = async (data) => {
    setLoading(true);
    await createProductKnowledge<ProductKnowledgeFormValues>(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Pilih AI Customer Service"
        inputKey="csAI"
        register={register}
        errors={errors}
      />
      <Select
        label="Pilih Nomor Whatsapp"
        inputKey="noWhatsapp"
        register={register}
        errors={errors}
      />
      <TextArea
        inputKey="productKnowledge"
        label="Product Knowledge"
        className="h-32"
        register={register}
        errors={errors}
      />
      <div className="flex justify-end mt-4">
        <Button type="submit" color="primary" disabled={loading} className="btn-wide">
          Simpan
        </Button>
      </div>
    </form>
  );
}
