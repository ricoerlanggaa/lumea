'use client';

import { Button, Input, TextArea } from '@/components/atoms';
import type {
  FormCustomerServiceProps,
  FormCustomerServiceValues,
} from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import { customerServiceSchema } from '@/utilities/validations/schema';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  createItem,
  fetchItem,
  itemState,
  isLoadingState,
  updateItem,
  fetchList,
} from '@/store/customerServiceSlice';
import { useCallback, useEffect } from 'react';
import useToast from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

export default function FormCustomerService({ itemId = 0, action }: FormCustomerServiceProps) {
  const dispatch = useAppDispatch();
  const item = useAppSelector(itemState);
  const isLoading = useAppSelector(isLoadingState);

  const {
    register,
    formState: { errors },
    setValues,
    resetValues,
    submitHandler,
  } = useForm(customerServiceSchema);
  const { showToast } = useToast();
  const router = useRouter();

  const fetchDetail = useCallback(() => {
    if (itemId) {
      dispatch(fetchItem(itemId));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  useEffect(() => {
    if (action === 'update' && item) {
      setValues({
        name: item.name,
        label: item.label,
        personality: item.personality,
      });
    } else {
      resetValues();
    }
  }, [action, item, resetValues, setValues]);

  const onSubmit = async (data: FormCustomerServiceValues) => {
    try {
      if (action === 'update') {
        await dispatch(updateItem({ ...data, id: itemId })).unwrap();
      } else {
        await dispatch(createItem(data)).unwrap();
      }
      showToast({
        variant: 'success',
        message: `Customer service berhasil ${action === 'update' ? 'diperbarui' : 'ditambahkan'}!`,
        duration: 3000,
      });
      dispatch(fetchList());
      router.push('/product-setup/ai-customer-service');
    } catch (error) {
      showToast({
        variant: 'error',
        message: String(error),
        duration: 3000,
      });
    }
  };

  return (
    <form onSubmit={submitHandler(onSubmit)}>
      <Input
        label="Nama"
        placeholder="Masukkan Nama Customer Service Anda"
        hasError={!!errors.name}
        helperText={errors.name}
        {...register('name')}
      />
      <Input
        label="Label (Opsional)"
        placeholder="Masukkan Label Customer Service Anda"
        hasError={!!errors.label}
        helperText={errors.label}
        {...register('label')}
      />
      <TextArea
        label="Personality"
        placeholder="Masukkan Personality Customer Service Anda"
        rows={5}
        hasError={!!errors.personality}
        helperText={errors.personality}
        {...register('personality')}
      />
      <Button type="submit" color="black" shape="wide" className="mt-2" disabled={isLoading}>
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
