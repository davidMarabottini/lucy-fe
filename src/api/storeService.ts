import apiClient from "./apiClient";
// import type { store, storePayload } from "./types";
import { exportFile } from "../utils/externalApi";
import type { Store, PayloadStore } from "./types";

//TODO: tipizzare

export const getstores = async (params?: Record<string, unknown>): Promise<Store[]> => {
  const { data } = await apiClient.get<Store[]>('/api/stores', { params });
  return data;
};

export const exportStoresExcel = async () => {
  const blob = await apiClient.get('/api/stores/export', { responseType: 'blob' }).then(res => res.data);
  exportFile(blob, 'stores.xlsx');
};

export const getStoreById = async (id: number): Promise<Store> => {
  const { data } = await apiClient.get<Store>(`/api/stores/${id}`);
  return data;
};

export const insertStore = async (payload: PayloadStore): Promise<Store> => {
  const { data } = await apiClient.post<Store>('/api/stores', payload);
  return data;
};

export const updateStore = async (id: number, payload: Partial<PayloadStore>): Promise<Store> => {
  const { data } = await apiClient.put<Store>(`/api/stores/${id}`, payload);
  return data;
};

export const deleteStore = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/stores/${id}`);
};
