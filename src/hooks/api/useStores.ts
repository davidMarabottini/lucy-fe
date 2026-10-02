import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { ERROR_KINDS } from "../useAppApi/error";
import { 
  getstores,

  // getSectors, 
  getStoreById, 
  insertStore, 
  updateStore, 
  deleteStore,
  // exportSectorsExcel
} from "@/api/storeService";
import type { ROUTES } from "@/constants/routes";
import type { Store } from "@/api/types";
// import type { store } from "@/api/types";

const libDomain = 'store';

export const useStores = (params?: Record<string, unknown>) =>
  useAppQuery<Store[]>({
    queryKey: ['stores', params],
    queryFn: () => getstores(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

export const useStoreDetail = (id: number, options?: { enabled?: boolean }) =>
  useAppQuery<Store>({
    queryKey: ['store', id],
    queryFn: () => getStoreById(id),
    enabled: !!id,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
    ...options,
  });

export const useInsertStore = (locNavigate?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertStore,
    onSuccess: () => {
      queryClient.invalidateQueries(['stores']);
      if(!locNavigate){
        navigate(ROUTES.STORE_LIST);
      }
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  });
};

export const useUpdateStore = (storeId?: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: (payload: Record<string, unknown>) => updateStore(storeId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      queryClient.invalidateQueries({ queryKey: ['store', storeId] });
      navigate(ROUTES.STORE_LIST);
    },
    successKey: `${libDomain}.update.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.update.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.update.defaultError`
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: deleteStore,
    onSuccess: () => {
      queryClient.invalidateQueries(['stores']);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`
    },
  });
};

// export const useExportSectorsExcel = () => {
//   return useAppMutation<void, void>({
//     mutationFn: exportSectorsExcel,
//     successKey: `${libDomain}.export.success`,
//     errorMap: {
//       [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.export.401`,
//       [ERROR_KINDS.SERVER]: `${libDomain}.export.500`,
//       [ERROR_KINDS.NETWORK]: `${libDomain}.export.network`,
//       [ERROR_KINDS.UNKNOWN]: `${libDomain}.export.defaultError`
//     },
//   });
// };
