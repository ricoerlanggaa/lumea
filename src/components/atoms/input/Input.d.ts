import { InputHTMLAttributes, ReactNode } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface InputProps<TInputValues extends FieldValues>
  extends Partial<UseFormReturn<TInputValues>>,
    InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search';
  label?: string;
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  inputKey: Path<TInputValues>;
  errors?: Partial<DeepMap<TInputValues, FieldError>>;
}
