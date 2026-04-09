import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { ERROR_KINDS } from "../useAppApi/error";
import { 
  getGroupCompanies, 
  getGroupCompanyById, 
  insertGroupCompany, 
  updateGroupCompany, 
  deleteGroupCompany,
  type GroupCompany,
  type GroupCompanyPayload
} from "@/api/groupCompanyService";

const libDomain = 'groupCompany';

// 1. LISTA SOCIETÀ
export const useGroupCompanies = (params?: Record<string, unknown>) =>
  useAppQuery<GroupCompany[]>({
    queryKey: ['group-companies', params],
    queryFn: () => getGroupCompanies(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 5, // 5 minuti
  });

// 2. DETTAGLIO SOCIETÀ
export const useGroupCompanyDetail = (id: number) =>
  useAppQuery({
    queryKey: ['group-company', id],
    queryFn: () => getGroupCompanyById(id),
    enabled: !!id,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
  });

// 3. INSERIMENTO
export const useInsertGroupCompany = (lockNavigate?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertGroupCompany,
    onSuccess: () => {
      // Invalida la lista per mostrare la nuova società
      queryClient.invalidateQueries(['group-companies']);
      if(!lockNavigate){
        navigate('/group-companies');
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
export const useUpdateGroupCompany = (id: number) => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (payload: Partial<GroupCompanyPayload>) => updateGroupCompany(id, payload),
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['group-companies']);
      queryClient.invalidateQueries(['group-company', id]);
    },
    successKey: `${libDomain}.update.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.update.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.update.defaultError`
    },
  });
};

// 5. ELIMINAZIONE
export const useDeleteGroupCompany = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: deleteGroupCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(['group-companies']);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`
    },
  });
};