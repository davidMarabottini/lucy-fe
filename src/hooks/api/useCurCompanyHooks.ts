/*
import apiClient from "./apiClient";

//TODO: cambiare any
export const getLibemaxUsers = async (): Promise<any> => {
  const { data } = await apiClient.get("/api/get-cur-company");
  return data;
};

export const setCurCompany = async (companyId: string): Promise<void> => {
  await apiClient.post("/api/set-cur-company", { companyId });
};

*/

import { useQueryClient } from "@tanstack/react-query";
import { ERROR_KINDS } from "../useAppApi/error";
import { useAppMutation } from "../useAppApi/useAppMutation";
import { useAppQuery } from "../useAppApi/useAppQuery";
import { getCurCompany, setCurCompany } from "@/api/apiCurCompany";

const libDomain = "cur-group-company";

export const useGetCurCompany = () =>
  useAppQuery({
    queryKey: ['cur-group-company'],
    queryFn: getCurCompany,
    enabled: true,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.detail.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.detail.defaultError`
    },
  });

export const useInsertCurCompany = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: setCurCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(['cur-group-company']);
    },
    successKey: `${libDomain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.SERVER]: `${libDomain}.insert.500`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.insert.defaultError`
    },
  });
};