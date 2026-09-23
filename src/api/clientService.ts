import apiClient from "./apiClient";
import type { LibemaxClient, LibemaxClientDetail, LibemaxAddClient } from "./types";
import { exportFile } from "../utils/externalApi";

export const getLibemaxClients = async (params?: Record<string, unknown>): Promise<LibemaxClient[]> => {
  const { data } = await apiClient.get("/api/clients", { params });
  return data;
};

export const insertClient = async (
  client: LibemaxAddClient
): Promise<LibemaxAddClient> => {
  const {data} = await apiClient.post('/api/clients', client)

  return data
}

export const exportClientExcel = async (filters?: Record<string, unknown>) => {
  console.log('davidlog - filters', filters)
  const blob = await apiClient.get('/api/clients/export', { responseType: 'blob', params: filters }).then(res => res.data);
  exportFile(blob, 'clienti.xlsx');
};

export const updateClient = async (
  clientId: number,
  client: LibemaxAddClient,
): Promise<LibemaxAddClient> => {
  const {data} = await apiClient.put(`/api/clients/${clientId}`, client)

  return data
}

export const getClientDetail = async (clientId: number): Promise<LibemaxClientDetail> => {
  const { data } = await apiClient.get(`/api/clients/${clientId}`);
  return data;
};

export const deleteClient = async (clientId: number): Promise<{ success: boolean }> => {
  const { data } = await apiClient.delete(`/api/clients/${clientId}`);
  return data;
};