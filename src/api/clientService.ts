import apiClient from "./apiClient";
import type { LibemaxClient, LibemaxClientDetail, LibemaxAddClient } from "./types";

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


export const getClientDetail = async (clientId: number): Promise<LibemaxClientDetail> => {
  const { data } = await apiClient.get(`/api/clients/${clientId}`);
  return data;
};

export const deleteClient = async (clientId: number): Promise<{ success: boolean }> => {
  const { data } = await apiClient.delete(`/api/clients/${clientId}`);
  return data;
};