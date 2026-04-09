import { getLibemaxUsers, getMissingClockin, getRemoteClockin, type LibemaxUser, type MissingClockin, type RemoteClockin } from "@/api/apiLibemaxIntegration";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { ERROR_KINDS } from "../useAppApi/error";

const libDomain = 'libemax';

export const useLibemaxUsers = () =>
  useAppQuery<LibemaxUser[]>({
    queryKey: ['libemax-users'],
    queryFn: getLibemaxUsers,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.users.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.users.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.users.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.users.defaultError`
    },
    staleTime: 1000 * 60 * 60, // 1h
  });

export const useMissingClockin = () =>
  useAppQuery<MissingClockin[]>({
    queryKey: ['libemax-missing-clockin'],
    queryFn: getMissingClockin,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.missingClockin.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.missingClockin.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.missingClockin.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.missingClockin.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

export const useRemoteClockin = () =>
  useAppQuery<RemoteClockin[]>({
    queryKey: ['libemax-remote-clockin'],
    queryFn: getRemoteClockin,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.remoteClockin.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.remoteClockin.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.remoteClockin.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.remoteClockin.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });
    
