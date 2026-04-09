import { useQueryClient } from "@tanstack/react-query";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { ERROR_KINDS } from "../useAppApi/error";
import {
  getWorkSchedules,
  insertWorkSchedule,
  getClientSchedules,
  type WorkSchedule,
  type WorkScheduleAdd,
  deleteWorkSchedule
} from "@/api/workScheduleService";

const libDomain = "workSchedule";

export const useWorkSchedules = () =>
  useAppQuery<WorkSchedule[]>({
    queryKey: ["workSchedules"],
    queryFn: getWorkSchedules,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`,
    },
    staleTime: 1000 * 60 * 60,
  });

export const useClientSchedules = (clientId: number) =>
  useAppQuery<WorkSchedule[]>({
    queryKey: ["workSchedules", clientId],
    queryFn: () => getClientSchedules(clientId),
    staleTime: 1000 * 60 * 5,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.client.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.client.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.client.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.client.defaultError`,
    },
  });

export const useInsertWorkSchedule = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (schedule: WorkScheduleAdd) => insertWorkSchedule(schedule),
    onSuccess: (data) => {
      queryClient.setQueryData(['result'], data)
      queryClient.invalidateQueries(['workSchedules']);
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.insert.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.insert.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`,
    },
  });
};

export const useDeleteWorkSchedule = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (id: number) => deleteWorkSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['workSchedules']);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.delete.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.delete.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`,
    },
  });
};
