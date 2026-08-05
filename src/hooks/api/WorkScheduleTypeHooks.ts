import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { ERROR_KINDS } from "../useAppApi/error";
import { 
  getWorkScheduleTypes, 
  getWorkScheduleTypeById, 
  insertWorkScheduleType, 
  updateWorkScheduleType, 
  deleteWorkScheduleType
} from "@/api/workScheduleTypeService";
import type { WorkScheduleType } from "@/api/types";
import { ROUTES } from "@/constants/routes";

const libDomain = 'workScheduleType';

export const useWorkScheduleTypes = (params?: Record<string, unknown>) =>
  useAppQuery<WorkScheduleType[]>({
    queryKey: ['workScheduleTypes', params],
    queryFn: () => getWorkScheduleTypes(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 60, // Cambiano raramente, teniamoli in cache un'ora
  });

export const useWorkScheduleTypeDetail = (id: number, options?: { enabled?: boolean }) =>
  useAppQuery({
    queryKey: ['workScheduleType', id],
    queryFn: () => getWorkScheduleTypeById(id),
    enabled: !!id,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
    ...options,
  });

export const useInsertWorkScheduleType = (locNavigate?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertWorkScheduleType,
    onSuccess: () => {
      queryClient.invalidateQueries(['workScheduleTypes']);
      // Presumendo che la rotta esista nelle tue costanti
      if(!locNavigate){
        navigate(ROUTES.WORK_SCHEDULE_TYPE_LIST || '/work-schedule-types');
      }
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  });
};

export const useUpdateWorkScheduleType = (workScheduleTypeId?: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: (payload: Record<string, unknown>) => updateWorkScheduleType(workScheduleTypeId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workScheduleTypes'] });
      queryClient.invalidateQueries({ queryKey: ['workScheduleType', workScheduleTypeId] });
      navigate(ROUTES.WORK_SCHEDULE_TYPE_LIST || '/work-schedule-types');
    },
    successKey: `${libDomain}.update.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.update.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.update.defaultError`
    },
  });
};

export const useDeleteWorkScheduleType = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: deleteWorkScheduleType,
    onSuccess: () => {
      queryClient.invalidateQueries(['workScheduleTypes']);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`
    },
  });
};