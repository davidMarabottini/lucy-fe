import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { normalizeError, type AppError } from './error.ts';
import { handleToast, type ToastOptions } from './toastHandler.ts';
import { useToast } from '../useToast';
import { useTranslation } from 'react-i18next';

type AppMutationOptions<TData, TVariables, TContext = unknown> = Omit<
    UseMutationOptions<TData, AppError, TVariables, TContext>,
    'mutationFn' | 'onSuccess' | 'onError'
  > & ToastOptions & {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables, context?: TContext) => void;
  onError?: (error: AppError, variables: TVariables, context?: TContext) => void;
};

export function useAppMutation<TData, TVariables>(
  options: AppMutationOptions<TData, TVariables>
) {
  const { addToast } = useToast();
  const { t } = useTranslation('toastMessages');

  return useMutation<TData, AppError, TVariables>({
    mutationFn: options.mutationFn,
    onSuccess: (data, variables, context) => {
      handleToast(null, options, addToast, t);
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const appError = normalizeError(error);
      handleToast(appError, options, addToast, t);
      options.onError?.(appError, variables, context);
    },
  });
}
