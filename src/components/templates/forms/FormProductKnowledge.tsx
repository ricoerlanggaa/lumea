'use client';

import { useCallback, useEffect } from 'react';
import { Button, Input, Select, TextArea } from '@/components/atoms';
import type {
  FormProductKnowledgeProps,
  FormProductKnowledgeValues,
} from '@/types/components/templates';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import useForm from '@/hooks/useForm';
import { productKnowledgeSchema } from '@/utilities/validations';
import {
  createItem,
  fetchItem,
  fetchList,
  isLoadingState,
  itemState,
  updateItem,
} from '@/store/productKnowledgeSlice';
import {
  selectOptionsState as whatsappSelectOptions,
  fetchSelectOptions as fetchWhatsappSelectOptions,
} from '@/store/whatsappSlice';
import {
  selectOptionsState as customerServiceSelectOptions,
  fetchSelectOptions as fetchCustomerServiceSelectOptions,
} from '@/store/customerServiceSlice';

export default function FormProductKnowledge({ action, itemId = 0 }: FormProductKnowledgeProps) {
  const dispatch = useAppDispatch();
  const item = useAppSelector(itemState);
  const whatsappOptions = useAppSelector(whatsappSelectOptions);
  const customerServiceOptions = useAppSelector(customerServiceSelectOptions);
  const isLoading = useAppSelector(isLoadingState);

  const {
    register,
    formState: { errors },
    setValues,
    resetValues,
    submitHandler,
  } = useForm(productKnowledgeSchema);

  const handleSubmit = (data: FormProductKnowledgeValues) => {
    if (action === 'update') {
      dispatch(updateItem({ ...data, id: itemId }));
    } else {
      dispatch(createItem(data));
    }
    dispatch(fetchList());
  };
  const fetchDetail = useCallback(() => {
    if (itemId) dispatch(fetchItem(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  useEffect(() => {
    dispatch(fetchCustomerServiceSelectOptions());
    dispatch(fetchWhatsappSelectOptions());
  }, [dispatch]);

  useEffect(() => {
    if (action === 'update' && item) {
      setValues({
        customerServiceId: item.customerServiceId,
        whatsappId: item.whatsappId,
        label: item.label,
        description: item.description,
      });
    } else {
      resetValues();
    }
  }, [action, item, resetValues, setValues]);

  return (
    <form onSubmit={submitHandler(handleSubmit)}>
      <Select
        label="Customer Service"
        placeholder="Pilih Customer Service"
        options={customerServiceOptions}
        hasError={!!errors.customerServiceId}
        helperText={errors.customerServiceId}
        {...register('customerServiceId')}
      />
      <Select
        label="Nomor Whatsapp"
        placeholder="Pilih Nomor Whatsapp"
        options={whatsappOptions}
        hasError={!!errors.whatsappId}
        helperText={errors.whatsappId}
        {...register('whatsappId')}
      />
      <Input
        label="Label (Opsional)"
        placeholder="Masukkan Label Product Anda"
        hasError={!!errors.label}
        helperText={errors.label}
        {...register('label')}
      />
      <TextArea
        label="Deskripsi"
        placeholder="Masukkan Deskripsi Product Anda"
        rows={5}
        hasError={!!errors.description}
        helperText={errors.description}
        {...register('description')}
      />
      <Button type="submit" color="black" className="mt-2" disabled={isLoading} shape="wide">
        {action === 'update' ? 'Update' : 'Simpan'}
      </Button>
    </form>
  );
}
