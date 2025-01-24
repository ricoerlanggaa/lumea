import type { InputHTMLAttributes, ReactNode } from 'react';
import type { DeepMap, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface InputProps<T extends FieldValues>
  extends Partial<UseFormReturn<T>>,
    InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search';
  label?: string;
  suffix?: ReactNode;
  preffix?: ReactNode;
  inputKey?: Path<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
}
