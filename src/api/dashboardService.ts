import apiClient from "@/api/apiClient";
import type { LibemaxEmployee } from "./types";

export const getLibemaxEmployees = async (params?: Record<string, unknown>): Promise<LibemaxEmployee[]> => {
  const { data } = await apiClient.get('/api/dashboard/employees-status', { params });
  return data;
};
