import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { normalizeError, type AppError } from './error';
import { handleToast, type ToastOptions } from './toastHandler';
import { useToast } from '../useToast';
import { useTranslation } from 'react-i18next';

type AppQueryOptions<TData> = ToastOptions &
  Omit<UseQueryOptions<TData, AppError, TData>, 'queryKey' | 'queryFn' | 'onSuccess' | 'onError'> & {
    queryKey: readonly unknown[];
    queryFn: () => Promise<TData>;
    onSuccess?: (data: TData) => void;
    onError?: (error: AppError) => void;
  };

export const useAppQuery = <TData>(options: AppQueryOptions<TData>) => {
  const { addToast } = useToast();
  const { t } = useTranslation('toastMessages');

  const {onSuccess, onError, queryFn, ...rest} = options;

  return useQuery<TData, AppError>({
    queryFn: async () => {
      try {
        const data = await queryFn();

        handleToast(null, options, addToast, t);
        onSuccess?.(data);

        return data;
      } catch (err) {
        const appError = normalizeError(err);
        handleToast(appError, options, addToast, t);
        onError?.(appError);
        throw appError;
      }
    },
    ...rest,
  });
}
