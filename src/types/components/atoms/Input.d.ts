import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search';
  label?: string;
  suffix?: ReactNode;
  preffix?: ReactNode;
  hasError?: boolean;
  helperText?: string;
}
