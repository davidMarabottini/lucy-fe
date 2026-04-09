import apiClient from "./apiClient";

export type LibemaxClient = {
  id: number;
  name: string;
  phone: string;
  email: string;
  // address?: string;
};

export type LibemaxClientDetail = {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: number | null;
  schedule?: string | null;
};

export type LibemaxAddClient = {
  "name": string;
  "email": string;
  "phone": string;
  "domain_id": number;
}


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