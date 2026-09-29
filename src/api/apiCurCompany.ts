// /api/set-cur-company
// api/get-cur-company
import apiClient from "./apiClient";

//TODO: cambiare any
export const getCurCompany = async (): Promise<any> => {
  const { data } = await apiClient.get("/api/cur-company");
  return data;
};

export const setCurCompany = async (cur_company_id: number): Promise<void> => {
  const { data } = await apiClient.put("/api/cur-company", { cur_company_id });
  return data;
};
