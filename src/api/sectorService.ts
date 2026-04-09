import apiClient from "./apiClient";

export interface Sector {
  id: number;
  name: string;
  description?: string;
}

export type SectorPayload = Omit<Sector, 'id'>;

export const getSectors = async (params?: Record<string, unknown>): Promise<Sector[]> => {
  const { data } = await apiClient.get<Sector[]>('/api/sectors', { params });
  return data;
};

export const getSectorById = async (id: number): Promise<Sector> => {
  const { data } = await apiClient.get<Sector>(`/api/sectors/${id}`);
  return data;
};

export const insertSector = async (payload: SectorPayload): Promise<Sector> => {
  const { data } = await apiClient.post<Sector>('/api/sectors', payload);
  return data;
};

export const updateSector = async ({ id, ...payload }: Sector): Promise<Sector> => {
  const { data } = await apiClient.put<Sector>(`/api/sectors/${id}`, payload);
  return data;
};

export const deleteSector = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/sectors/${id}`);
};
