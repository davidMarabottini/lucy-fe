import { useQueryClient } from '@tanstack/react-query';
import * as authService from '@/api/authService';
import { useAppMutation } from '../useAppApi/useAppMutation';
import { useAppQuery } from '../useAppApi/useAppQuery';
import { ERROR_KINDS } from '../useAppApi/error';

const authDomain = 'auth';
const meDomain = 'me';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], data.user);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    successKey: `${authDomain}.login.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${authDomain}.login.401`,
      [ERROR_KINDS.SERVER]: `${authDomain}.login.500`,
      [ERROR_KINDS.NETWORK]: `${authDomain}.login.network`,
      [ERROR_KINDS.UNKNOWN]: `${authDomain}.login.defaultError`
    }
  });
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
      queryClient.clear(); 
    },
    successKey: `${authDomain}.logout.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${authDomain}.logout.401`,
      [ERROR_KINDS.SERVER]: `${authDomain}.logout.500`,
      [ERROR_KINDS.NETWORK]: `${authDomain}.logout.network`,
      [ERROR_KINDS.UNKNOWN]: `${authDomain}.logout.defaultError`
    }
  })
}

export const useMe = () => useAppQuery({
    queryKey: ['me'],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${authDomain}.me.401`,
      [ERROR_KINDS.SERVER]: `${authDomain}.me.500`,
      [ERROR_KINDS.NETWORK]: `${authDomain}.me.network`,
      [ERROR_KINDS.UNKNOWN]: `${authDomain}.me.defaultError`
    }
  });

// TODO: spostare questa parte in useUserHooks.ts
export const useMineDetails = () =>
  useAppQuery({
    queryKey: ['mineDetails'],
    queryFn: authService.getMineDetails,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${meDomain}.get.401`,
      [ERROR_KINDS.SERVER]: `${meDomain}.get.500`,
      [ERROR_KINDS.NETWORK]: `${meDomain}.get.network`,
      [ERROR_KINDS.UNKNOWN]: `${meDomain}.get.defaultError`
    }
  })

export const useUpdateMineDetails = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: authService.updateMineDetails,
    onSuccess: updatedData => {
      queryClient.setQueryData(['mineDetails'], updatedData.user);
    },
    successKey: `${meDomain}.update.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${meDomain}.update.401`,
      [ERROR_KINDS.SERVER]: `${meDomain}.update.500`,
      [ERROR_KINDS.NETWORK]: `${meDomain}.update.network`,
      [ERROR_KINDS.UNKNOWN]: `${meDomain}.update.defaultError`
    },
  })
}
