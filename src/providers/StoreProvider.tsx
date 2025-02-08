'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import { StoreApp } from '@/types/hooks/useStore';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<StoreApp | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
