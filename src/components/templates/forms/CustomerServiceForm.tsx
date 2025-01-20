'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, TextArea } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';
import { CustomerServiceItem } from '@/types/services';
import {
  customerServiceNameValidation,
  customerServicePersonalityValidation,
} from '@/utilities/validations/schema';
import { apiCreateCustomerService, apiUpdateCustomerService } from '@/services';

const customerServiceValidationSchema = yup.object().shape({
  name: customerServiceNameValidation,
  personality: customerServicePersonalityValidation,
});

export default function CustomerServiceForm({
  id = 0,
  value,
  action,
}: {
  id?: number;
  value?: CustomerServiceItem;
  action?: 'create' | 'update';
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerServiceItem>({
    resolver: yupResolver(customerServiceValidationSchema),
  });
  const router = useRouter();
  const { showToast } = useToast();
  const [customerService, setCustomerService] = useState<CustomerServiceItem>({
    name: value?.name ?? '',
    label: value?.label ?? '',
    personality: value?.personality ?? '',
  });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<CustomerServiceItem> = async (data) => {
    setLoading(true);
    const response =
      action === 'update'
        ? await apiUpdateCustomerService({ ...data, id })
        : await apiCreateCustomerService(data);
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
        inputKey="name"
        label="Nama Customer Service AI"
        placeholder="Masukkan Nama Customer Service AI Anda"
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
        label="CS Personality"
        className="h-32"
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
CustomerServiceForm.defaultProps = {
  id: 0,
  action: 'create',
  value: { name: '', personality: '', label: '' } as CustomerServiceItem,
};
