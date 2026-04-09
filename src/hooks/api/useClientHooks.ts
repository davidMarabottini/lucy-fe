import { getClientDetail, getLibemaxClients, insertClient, deleteClient, type LibemaxClient } from "@/api/clientService";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { ERROR_KINDS } from "../useAppApi/error";
import { useQueryClient } from "@tanstack/react-query";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const libDomain = 'client';

export const useLibemaxClients = (params?: Record<string, unknown>) =>
  useAppQuery<LibemaxClient[]>({
    queryKey: ['libemax-clients', params],
    queryFn: () => getLibemaxClients(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.clients.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.clients.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.clients.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.clients.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

  export const useClientDetail = (clientId: number) =>
    useAppQuery({
      queryKey: ["client", clientId],
      queryFn: () => getClientDetail(clientId),
      staleTime: 1000 * 60 * 5,
      errorMap: {
        [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.cilentDetails.401`,
        [ERROR_KINDS.SERVER]: `${libDomain}.cilentDetails.500`,
        [ERROR_KINDS.NETWORK]: `${libDomain}.cilentDetails.network`,
        [ERROR_KINDS.UNKNOWN]: `${libDomain}.cilentDetails.defaultError`
      },
    });

  export const useInsertClient = (lockNavigate?: boolean) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertClient,
    onSuccess: data => {
      queryClient.setQueryData(['result'], data)
      queryClient.invalidateQueries(['libemax-clients'])
      if(!lockNavigate){
        navigate(ROUTES.LIBEMAX_CLIENTS)
      }

    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.insert.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.insert.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  })
  }

export const useClientDelete = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (clientId: number) => deleteClient(clientId),

    onSuccess: (_) => {
      queryClient.invalidateQueries(['libemax-clients']);
    },

    onError: (error: any) => {
      console.error("DELETE ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("DATA:", error?.response?.data);
    },

    successKey: `client.delete.success`,

    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `client.delete.401`,
      [ERROR_KINDS.SERVER]: `client.delete.500`,
      [ERROR_KINDS.NETWORK]: `client.delete.network`,
      [ERROR_KINDS.UNKNOWN]: `client.delete.defaultError`
    },
  });
};