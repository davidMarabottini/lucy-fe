import apiClient from "./apiClient";

export type WorkSchedule = {
  id: number;
  user_id: number;
  client_id?: number | null;
  contract_id?: number | null;
  schedule_type_id: number;
  week_day_id?: number | null;
  start_time?: string | null;
  end_time?: string | null;
  weekly_hours?: number | null;
  note?: string | null;
  week_day?: { id: number; name: string } | null;
  work_activity?: { id: number; name: string } | null;
};

export type WorkScheduleAdd = {
  user_id?: number;
  client_id?: number;
  contract_id?: number;
  schedule_type_id: number;
  week_day_id?: number;
  start_time?: string;
  end_time?: string;
  weekly_hours?: number;
  note?: string;
};

// GET tutte le schedule
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