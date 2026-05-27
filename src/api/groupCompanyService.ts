import apiClient from "./apiClient";
import type { GroupCompany, GroupCompanyPayload } from "./types";

export const getGroupCompanies = async (params?: Record<string, unknown>): Promise<GroupCompany[]> => {
  const { data } = await apiClient.get<GroupCompany[]>('/api/group-company', {params});
  return data;
};

export const getGroupCompanyById = async (id: number): Promise<GroupCompany> => {
  const { data } = await apiClient.get<GroupCompany>(`/api/group-company/${id}`);
  return data;
};

export const insertGroupCompany = async (payload: GroupCompanyPayload): Promise<GroupCompany> => {
  const { data } = await apiClient.post<GroupCompany>('/api/group-company', payload);
  return data;
};

export const updateGroupCompany = async (id: number, payload: Partial<GroupCompanyPayload>): Promise<GroupCompany> => {
  const { data } = await apiClient.put<GroupCompany>(`/api/group-company/${id}`, payload);
  return data;
};

export const deleteGroupCompany = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/group-company/${id}`);
};