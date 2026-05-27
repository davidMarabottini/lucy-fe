import apiClient from "./apiClient";
import type { WorkSchedule, WorkScheduleAdd } from "./types";

export const getWorkSchedules = async (): Promise<WorkSchedule[]> => {
  const { data } = await apiClient.get("/api/work-schedules");
  return data;
};

// POST per creare una nuova schedule
export const insertWorkSchedule = async (
  schedule: WorkScheduleAdd
): Promise<WorkSchedule> => {
  const { data } = await apiClient.post("/api/work-schedules", schedule);
  return data;
};

// GET schedule per client
export const getClientSchedules = async (clientId: number): Promise<WorkSchedule[]> => {
  const { data } = await apiClient.get(`/api/work-schedules/client/${clientId}`);
  return data;
};

export const deleteWorkSchedule = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/work-schedules/${id}`);
};

// GET schedule per contratto
export const getContractSchedules = async (contractId: number): Promise<WorkSchedule[]> => {
  const { data } = await apiClient.get(`/api/work-schedules/contract/${contractId}`);
  return data;
};