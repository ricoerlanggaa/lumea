'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, TextArea } from '@/components/atoms';
import type {
  FormCustomerServiceProps,
  FormCustomerServiceValues,
} from '@/types/components/templates';
import useToast from '@/hooks/useToast';
import { apiCreateCustomerService, apiUpdateCustomerService } from '@/services';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { customerServiceSchema } from '@/utilities/validations/schema';

export default function FormCustomerService({
  itemId = 0,
  value = { name: '', label: '', personality: '' },
  action,
}: FormCustomerServiceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCustomerServiceValues>({
    resolver: ajvResolver(customerServiceSchema),
    mode: 'onSubmit',
    defaultValues: value,
  });
  const router = useRouter();
  const { showToast } = useToast();

  const [state, setState] = useState<FormCustomerServiceValues>(value);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormCustomerServiceValues> = async (data) => {
    setLoading(true);
    const response =
      action === 'update'
        ? await apiUpdateCustomerService({ ...data, id: +itemId })
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
        label="Nama"
        placeholder="Masukkan Nama Customer Service Anda"
        register={register}
        errors={errors}
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
      <Input
        inputKey="label"
        label="Label (Opsional)"
        placeholder="Masukkan Label Customer Service Anda"
        register={register}
        errors={errors}
        value={state.label}
        onChange={(e) => setState({ ...state, label: e.target.value })}
      />
      <TextArea
        inputKey="personality"
        label="Personality"
        placeholder="Masukkan Personality Customer Service Anda"
        rows={5}
        register={register}
        errors={errors}
        value={state.personality}
        onChange={(e) => setState({ ...state, personality: e.target.value })}
      />
      <Button type="submit" color="black" width="wide" className="mt-2" disabled={loading}>
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
