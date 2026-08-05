import apiClient from "./apiClient";
import type { WorkScheduleType, WorkScheduleTypePayload } from "./types";

export const getWorkScheduleTypes = async (params?: Record<string, unknown>): Promise<WorkScheduleType[]> => {
  const { data } = await apiClient.get<WorkScheduleType[]>('/api/work-schedule-types', { params });
  return data;
};

export const getWorkScheduleTypeById = async (id: number): Promise<WorkScheduleType> => {
  const { data } = await apiClient.get<WorkScheduleType>(`/api/work-schedule-types/${id}`);
  return data;
};

export const insertWorkScheduleType = async (payload: WorkScheduleTypePayload): Promise<WorkScheduleType> => {
  const { data } = await apiClient.post<WorkScheduleType>('/api/work-schedule-types', payload);
  return data;
};

export const updateWorkScheduleType = async (id: number, payload: Partial<WorkScheduleTypePayload>): Promise<WorkScheduleType> => {
  const { data } = await apiClient.put<WorkScheduleType>(`/api/work-schedule-types/${id}`, payload);
  return data;
};

export const deleteWorkScheduleType = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/work-schedule-types/${id}`);
};