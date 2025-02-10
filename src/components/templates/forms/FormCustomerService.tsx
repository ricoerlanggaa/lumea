'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, TextArea } from '@/components/atoms';
import {
  createItem,
  fetchItem,
  itemState,
  isLoadingState,
  updateItem,
} from '@/store/customerServiceSlice';
import type {
  FormCustomerServiceProps,
  FormCustomerServiceValues,
} from '@/types/components/templates';
import useForm from '@/hooks/useForm';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { customerServiceSchema } from '@/utilities/validations';

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
        label: item.label ?? '',
        personality: item.personality,
      });
    } else {
      resetValues();
    }
  }, [action, item, resetValues, setValues]);

  const onSubmit = async (data: FormCustomerServiceValues) => {
    let response = null;
    if (action === 'update') {
      response = await dispatch(updateItem({ ...data, id: itemId })).unwrap();
    } else {
      response = await dispatch(createItem(data)).unwrap();
    }
    if (response.success) {
      router.push('/product-setup/ai-customer-service');
    }
  };

  return (
    <form onSubmit={submitHandler(onSubmit)} noValidate>
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
        className="mb-4"
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
