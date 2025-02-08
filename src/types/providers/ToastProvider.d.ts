import { ReactNode } from 'react';
import { ToastConfig } from '../contexts/ToastContext';

export interface ToastItem extends ToastConfig {
  id: string;
}
export type ToastState = ToastItem[];

export interface ToastProps {
  children: ReactNode;
}
export type ToastShowProps = ToastConfig;
