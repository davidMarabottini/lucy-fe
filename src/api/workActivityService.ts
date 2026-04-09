import apiClient from "./apiClient";

// Tipo per l'attività esistente (quella che arriva dal DB con ID)
export type WorkActivity = {
  id: number;
  name: string;
  description: string;
};

// Tipo per la creazione/modifica (ID opzionale o assente)
export type WorkActivityAdd = {
  name: string;
  description: string;
};

/**
 * GET - Recupera tutte le attività dal catalogo
 */
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