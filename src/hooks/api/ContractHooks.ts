import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { ERROR_KINDS } from "../useAppApi/error";
import type { PaginatedData } from "@/components/organisms/TablePaginated/TablePaginated.types";
import { 
  getContracts, 
  getContractById, 
  insertContract, 
  updateContract, 
  deleteContract,
  type Contract,
  type ContractPayload
} from "@/api/contractService";

const libDomain = 'contract';

// 1. LISTA CONTRATTI
// extends { page?: number; per_page?: number; search?: string; raw?: boolean }
export const useContracts = (params?: Record<string, unknown>) =>
  useAppQuery<PaginatedData<Contract>>({
    queryKey: ['contracts', params], 
    queryFn: () => getContracts(params) as Promise<PaginatedData<Contract>>,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData, 
  });

// 2. DETTAGLIO CONTRATTO
export const useContractDetail = (id: number) =>
  useAppQuery<Contract>({
    queryKey: ['contract', id],
    queryFn: () => getContractById(id),
    enabled: !!id,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
  });

// 3. INSERIMENTO
export const useInsertContract = (locNavigate?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertContract,
    onSuccess: () => {
      // Invalida la lista per mostrare il nuovo contratto
      queryClient.invalidateQueries(['contracts']);
      if(!locNavigate){
        navigate('/contracts');
      } 
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  });
};

// 4. AGGIORNAMENTO
export const useUpdateContract = (id: number) => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (payload: Partial<ContractPayload>) => updateContract(id, payload),
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['contracts']);
      queryClient.invalidateQueries(['contract', id]);
    },
    successKey: `${libDomain}.update.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.update.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.update.defaultError`
    },
  });
};

// 5. ELIMINAZIONE
export const useDeleteContract = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: deleteContract,
    onSuccess: () => {
      queryClient.invalidateQueries(['contracts']);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`
    },
  });
};