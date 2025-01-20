import { SelectHTMLAttributes } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

type SelectItems = {
  key: number | string;
  label: string;
  value: string;
}[];

interface SelectProps<TInputValues extends FieldValues>
  extends Partial<UseFormReturn<TInputValues>>,
    SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  items?: SelectItems;
  inputKey: Path<TInputValues>;
  errors?: Partial<DeepMap<TInputValues, FieldError>>;
}
