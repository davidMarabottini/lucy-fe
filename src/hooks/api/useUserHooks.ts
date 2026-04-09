import { useQueryClient } from '@tanstack/react-query';
import * as userService from '@/api/userService';
import { useAppMutation } from '../useAppApi/useAppMutation';
import { ERROR_KINDS } from '../useAppApi/error';
import { useAppQuery } from '../useAppApi/useAppQuery';
import { useNavigate } from 'react-router-dom';

const domain = 'me';

export const useInsertUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: userService.insertUser,
    onSuccess: data => {
      queryClient.setQueryData(['result'], data);
      queryClient.invalidateQueries(['users']);
      navigate('/users');
    },
    successKey: `${domain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${domain}.insert.401`,
      [ERROR_KINDS.SERVER]: `${domain}.insert.500`,
      [ERROR_KINDS.NETWORK]: `${domain}.insert.network`,
      [ERROR_KINDS.UNKNOWN]: `${domain}.insert.defaultError`
    },
  })
}

export const useUserStatus = () =>
  useAppQuery<userService.UserStatusResult>({
    queryKey: ['userStatus'],
    queryFn: userService.getUserStatus,
    staleTime: 1000 * 60 * 5, 
  });

export const useUsers = () =>
  useAppQuery<userService.UsersResult[]>({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${domain}.missingClockin.401`,
      [ERROR_KINDS.SERVER]: `${domain}.missingClockin.500`,
      [ERROR_KINDS.NETWORK]: `${domain}.missingClockin.network`,
      [ERROR_KINDS.UNKNOWN]: `${domain}.missingClockin.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

  export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useAppMutation({
      mutationFn: userService.deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
      successKey: `${domain}.delete.success`,
      errorMap: {
        [ERROR_KINDS.UNAUTHORIZED]: `${domain}.delete.401`,
        [ERROR_KINDS.SERVER]: `${domain}.delete.500`,
        [ERROR_KINDS.NETWORK]: `${domain}.delete.network`,
        [ERROR_KINDS.UNKNOWN]: `${domain}.delete.defaultError`
      },
    })
  }