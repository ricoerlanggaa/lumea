import { createContext } from 'react';
import type { ToastContextProps } from '@/types/contexts/ToastContext';

const ToastContext = createContext<ToastContextProps | null>(null);

export default ToastContext;
