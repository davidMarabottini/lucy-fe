import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { ERROR_KINDS } from "../useAppApi/error";
import { 
  getSectors, 
  getSectorById, 
  insertSector, 
  updateSector, 
  deleteSector
} from "@/api/sectorService";
import type { Sector } from "@/api/types";

const libDomain = 'sector';

export const useSectors = (params?: Record<string, unknown>) =>
  useAppQuery<Sector[]>({
    queryKey: ['sectors', params],
    queryFn: () => getSectors(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

export const useSectorDetail = (id: number, options?: { enabled?: boolean }) =>
  useAppQuery({
    queryKey: ['sector', id],
    queryFn: () => getSectorById(id),
    enabled: !!id,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
    ...options,
  });

export const useInsertSector = (locNavigate?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertSector,
    onSuccess: () => {
      queryClient.invalidateQueries(['sectors']);
      if(!locNavigate){
        navigate('/sectors');
      }
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  });
};

export const useUpdateSector = (sectorId?: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: (payload: Record<string, unknown>) => updateSector(sectorId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sectors'] });
      queryClient.invalidateQueries({ queryKey: ['sector', sectorId] });
      navigate('/sectors');
    },
    successKey: `${libDomain}.update.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.update.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.update.defaultError`
    },
  });
};

export const useDeleteSector = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: deleteSector,
    onSuccess: () => {
      queryClient.invalidateQueries(['sectors']);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`
    },
  });
};
