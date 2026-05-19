
import { useAppQuery } from "../useAppApi/useAppQuery";
import { ERROR_KINDS } from "../useAppApi/error";
import { useQueryClient } from "@tanstack/react-query";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { deleteEmployee, getEmployeeDetail, getLibemaxEmployees, insertEmployee, type LibemaxEmployee } from "@/api/employeesService";

const libDomain = 'employees';

export const useEmployeesList = (params?: Record<string, unknown>) =>
  useAppQuery<LibemaxEmployee[]>({
    queryKey: ['libemax-employees', params],
    queryFn: () => getLibemaxEmployees(params),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

export const useEmployeeDetail = (employeeId: number) =>
  useAppQuery<LibemaxEmployee>({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeDetail(employeeId),
    staleTime: 1000 * 60 * 5,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.detail.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.detail.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
  });

export const useInsertEmployee = (lockNavigate?: boolean) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

  return useAppMutation({
    mutationFn: insertEmployee,
    onSuccess: data => {
      queryClient.setQueryData(['result'], data)
      queryClient.invalidateQueries(['libemax-employees']);
      if(!lockNavigate){
        navigate(ROUTES.LIBEMAX_EMPLOYEES)
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

export const useEmployeeDelete = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (employeeId: number) => deleteEmployee(employeeId),

    onSuccess: (_) => {
      queryClient.invalidateQueries(['libemax-employees']);
    },

    onError: (error: any) => {
      console.error("DELETE ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("DATA:", error?.response?.data);
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