'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { csAINameValidation, csAIPersonalityValidation } from '@/utilities/validations/schema';
import { Button, Input, TextArea } from '@/components/atoms';
import {
  createCustomerService,
  updateCustomerService,
  type CustomerServiceItem,
} from '@/actions/customer-service';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';

const csAiValidationSchema = yup.object().shape({
  csAIName: csAINameValidation,
  csAIPersonality: csAIPersonalityValidation,
});

export default function AICustomerServiceForm({
  action = 'create',
  value,
}: {
  action?: 'create' | 'update';
  value?: CustomerServiceItem;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerServiceItem>({
    resolver: yupResolver(csAiValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();
  const [customerService, setCustomerService] = useState<CustomerServiceItem>({
    csAIName: value?.csAIName ?? '',
    csAIPersonality: value?.csAIPersonality ?? '',
    label: value?.label ?? '',
  });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<CustomerServiceItem> = async (data) => {
    setLoading(true);
    const response =
      action === 'update' ? await updateCustomerService(data) : await createCustomerService(data);
    if (response.status) {
      showToast({
        variant: 'success',
        message: `AI Customer Service berhasil ${action === 'update' ? 'diperbarui' : 'ditambahkan'}!`,
        placement: 'bottom-center',
      });
      router.push('/product-setup/ai-customer-service');
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
        value={customerService.csAIName}
        onChange={(e) => setCustomerService({ ...customerService, csAIName: e.target.value })}
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
        inputKey="csAIPersonality"
        label="CS Personality"
        className="h-32"
        register={register}
        errors={errors}
        value={customerService.csAIPersonality}
        onChange={(e) =>
          setCustomerService({ ...customerService, csAIPersonality: e.target.value })
        }
      />
      <Button type="submit" color="black" width="wide" className="mt-2" disabled={loading}>
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
AICustomerServiceForm.defaultProps = {
  action: 'create',
  value: { csAIName: '', csAIPersonality: '', label: '' } as CustomerServiceItem,
};
