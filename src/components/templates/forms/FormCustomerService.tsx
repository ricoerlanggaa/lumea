'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, TextArea } from '@/components/atoms';
import type {
  FormCustomerServiceProps,
  FormCustomerServiceValues,
} from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import {
  customerServiceNameValidation,
  customerServicePersonalityValidation,
} from '@/utilities/validations/schema';
import { apiCreateCustomerService, apiUpdateCustomerService } from '@/services';

const customerServiceValidationSchema = yup.object().shape({
  name: customerServiceNameValidation,
  personality: customerServicePersonalityValidation,
});

export default function FormCustomerService({
  itemId = 0,
  value,
  action,
}: FormCustomerServiceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCustomerServiceValues>({
    resolver: yupResolver(customerServiceValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [customerService, setCustomerService] = useState<FormCustomerServiceValues>({
    name: value?.name ?? '',
    label: value?.label ?? '',
    personality: value?.personality ?? '',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormCustomerServiceValues> = async (data) => {
    setLoading(true);
    const response =
      action === 'update'
        ? await apiUpdateCustomerService({ ...data, id: itemId })
        : await apiCreateCustomerService(data);
    if (response.status) {
      showToast({
        variant: 'success',
        message: `AI Customer Service berhasil ${action === 'update' ? 'diperbarui' : 'ditambahkan'}!`,
      });
      router.push('/product-setup/ai-customer-service');
    } else {
      showToast({
        variant: 'error',
        message: response.message || 'Something went wrong!',
      });
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        inputKey="name"
        label="Nama AI Customer Service"
        placeholder="Masukkan Nama AI Customer Service Anda"
        register={register}
        errors={errors}
        value={customerService.name}
        onChange={(e) => setCustomerService({ ...customerService, name: e.target.value })}
      />
      <Input
        inputKey="label"
        label="Label (Opsional)"
        placeholder="Masukkan Label Produk Anda"
        register={register}
        errors={errors}
        value={customerService.label}
        onChange={(e) => setCustomerService({ ...customerService, label: e.target.value })}
      />
      <TextArea
        inputKey="personality"
        label="Customer Service Personality"
        rows={5}
        register={register}
        errors={errors}
        value={customerService.personality}
        onChange={(e) => setCustomerService({ ...customerService, personality: e.target.value })}
      />
      <Button type="submit" color="black" width="wide" className="mt-2" disabled={loading}>
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
