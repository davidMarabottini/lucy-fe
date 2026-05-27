import { getLibemaxTimbrature } from "@/api/apiLibemaxTimbrature";
import type { LibemaxTimbratureType } from "@/api/types";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { ERROR_KINDS } from "../useAppApi/error";

const libDomain = 'libemax';

export const useLibemaxTimbrature = (userId: number, date: string, enabled = true) =>
  useAppQuery<LibemaxTimbratureType>({
    queryKey: ['libemax-timbrature', userId, date],
    queryFn: () => getLibemaxTimbrature(userId, date),
    enabled,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.timbrature.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.timbrature.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.timbrature.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.timbrature.defaultError`
    },
    staleTime: 1000 * 60 * 60, // 1h
  });
