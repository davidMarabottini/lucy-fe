import { 
  getWorkActivities, 
  getActivityById, 
  insertWorkActivity, 
  deleteWorkActivity, 
  type WorkActivity, 
} from "@/api/workActivityService";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { ERROR_KINDS } from "../useAppApi/error";
import { useQueryClient } from "@tanstack/react-query";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { useNavigate } from "react-router-dom";

const libDomain = 'workActivity';

export const useWorkActivities = (params?: Record<string, unknown>) =>
  useAppQuery<WorkActivity[]>({
    queryKey: ['work-activities', params],
    queryFn: () => getWorkActivities(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

export const useWorkActivityDetail = (activityId: number) =>
  useAppQuery({
    queryKey: ["work-activity", activityId],
    queryFn: () => getActivityById(activityId),
    staleTime: 1000 * 60 * 5,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.detail.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.detail.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
  });

export const useInsertWorkActivity = (locNavigate?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertWorkActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['work-activities']);
      if(!locNavigate) {
        navigate('/work-activities');
      }
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.insert.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.insert.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  });
};

// Hook per l'eliminazione
export const useWorkActivityDelete = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (activityId: number) => deleteWorkActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries(['work-activities']);
    },
    onError: (error: any) => {
      console.error("DELETE ACTIVITY ERROR:", error);
    },
    successKey: `${libDomain}.delete.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.delete.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.delete.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.delete.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.delete.defaultError`
    },
  });
};
