import { useDispatch, useSelector, useStore } from 'react-redux';
import { StoreApp, StoreDispatch, StoreState } from '@/types/hooks/useStore';

export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();
export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppStore = useStore.withTypes<StoreApp>();
