import { getDomain } from "@/api/domains";
import { ERROR_KINDS } from "../useAppApi/error";
import { useAppQuery } from "../useAppApi/useAppQuery";

const domDomain = 'domain';

export const useDomain = () => useAppQuery({
  queryKey: ['domains'],
  queryFn: getDomain,
  errorMap: {
    [ERROR_KINDS.UNAUTHORIZED]: `${domDomain}.get.401`,
    [ERROR_KINDS.SERVER]: `${domDomain}.get.500`,
    [ERROR_KINDS.NETWORK]: `${domDomain}.get.network`,
    [ERROR_KINDS.UNKNOWN]: `${domDomain}.get.defaultError`
  },
  staleTime: 1000 * 60 * 60,
})