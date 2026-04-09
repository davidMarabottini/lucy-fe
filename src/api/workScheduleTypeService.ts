import apiClient from "./apiClient";

export type PeriodType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'FIXED' | 'NONE';

export interface WorkScheduleType {
  id: number;
  name: string;
  description?: string;
  frequency?: number;
  period: PeriodType;
  icon_name: string;
}

export type WorkScheduleTypePayload = Omit<WorkScheduleType, 'id'>;

export const getWorkScheduleTypes = async (): Promise<WorkScheduleType[]> => {
  const { data } = await apiClient.get<WorkScheduleType[]>('/api/work-schedule-types');
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

export const updateWorkScheduleType = async ({ id, ...payload }: WorkScheduleType): Promise<WorkScheduleType> => {
  const { data } = await apiClient.put<WorkScheduleType>(`/api/work-schedule-types/${id}`, payload);
  return data;
};

export const deleteWorkScheduleType = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/work-schedule-types/${id}`);
};