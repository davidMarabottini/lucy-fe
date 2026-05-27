import apiClient from "./apiClient";
import type { WorkActivity, WorkActivityAdd } from "./types";

export const getWorkActivities = async (params?: Record<string, unknown>): Promise<WorkActivity[]> => {
  const { data } = await apiClient.get("/api/activities", {params});
  return data;
};

/**
 * GET - Recupera una singola attività per ID
 */
export const getActivityById = async (activityId: number): Promise<WorkActivity> => {
  const { data } = await apiClient.get(`/api/activities/${activityId}`);
  return data;
};

/**
 * POST - Crea una nuova attività nel catalogo
 */
export const insertWorkActivity = async (
  activity: WorkActivityAdd
): Promise<WorkActivity> => {
  const { data } = await apiClient.post("/api/activities", activity);
  return data;
};

/**
 * PUT - Aggiorna un'attività esistente
 */
export const updateWorkActivity = async (
  activityId: number,
  activity: Partial<WorkActivityAdd>
): Promise<{ status: string; data: WorkActivity }> => {
  const { data } = await apiClient.put(`/api/activities/${activityId}`, activity);
  return data;
};

/**
 * DELETE - Rimuove un'attività dal catalogo
 */
export const deleteWorkActivity = async (activityId: number): Promise<{ status: string }> => {
  const { data } = await apiClient.delete(`/api/activities/${activityId}`);
  return data;
};