import { useAppDispatch } from '@/hooks/useStore';
import { showToast as showToastAction } from '@/store/toastSlice';
import { ToastShowAction } from '@/types/store';

export default function useToast() {
  const dispatch = useAppDispatch();

  const showToast = (config: ToastShowAction) => {
    dispatch(showToastAction(config));
  };

  return { showToast };
}
