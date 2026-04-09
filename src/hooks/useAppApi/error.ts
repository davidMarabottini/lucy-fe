import type { ValueOf } from "@/types/utilities.types";
import type { AxiosError } from "axios";

export const ERROR_KINDS = {
  NETWORK: 'NETWORK',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  VALIDATION: 'VALIDATION',
  RATE_LIMIT: 'RATE_LIMIT',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN',
} as const;


export type AppError = {
  kind: ValueOf<typeof ERROR_KINDS>
  status?: number;
  message: string;
}

const STATUS_TO_KIND = {
  400: ERROR_KINDS.VALIDATION,
  401: ERROR_KINDS.UNAUTHORIZED,
  403: ERROR_KINDS.FORBIDDEN,
  404: ERROR_KINDS.NOT_FOUND,
  409: ERROR_KINDS.CONFLICT,
  429: ERROR_KINDS.RATE_LIMIT,
  500: ERROR_KINDS.SERVER,
  502: ERROR_KINDS.SERVER,
  503: ERROR_KINDS.SERVER,
};

type KindKey = keyof typeof STATUS_TO_KIND;

const isKindNr = (status: number): status is Extract<KindKey, number> => status in STATUS_TO_KIND;

export const normalizeError = (error: unknown): AppError => {
  if(error && (error as AxiosError).isAxiosError) {
    const {response, message} = error as AxiosError;
    const status = response?.status;
    
    if (!status) return {
      kind: ERROR_KINDS.NETWORK, message
    };

    const kind = isKindNr(status) ? STATUS_TO_KIND[status] : ERROR_KINDS.UNKNOWN;

    return { kind, status, message }
  }

  return { kind: ERROR_KINDS.UNKNOWN, message: (error as Error)?.message || 'Unknown error' };
}