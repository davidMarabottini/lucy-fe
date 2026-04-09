import apiClient from "./apiClient";
import { type Sector } from "./sectorService"; // Importiamo Sector per il dettaglio

export interface GroupCompany {
  id: number;
  name: string;
  vat_number: string;
  sectors: Sector[]; // Il backend restituisce gli oggetti Sector completi
}

// Payload per l'invio dati (usiamo gli ID dei settori)
export interface GroupCompanyPayload {
  name: string;
  vat_number: string;
  sector_ids: number[]; // Array di ID per la relazione Many-to-Many
}

export const getGroupCompanies = async (params?: Record<string, unknown>): Promise<GroupCompany[]> => {
  const { data } = await apiClient.get<GroupCompany[]>('/api/group-company', {params});
  return data;
};

export const getGroupCompanyById = async (id: number): Promise<GroupCompany> => {
  const { data } = await apiClient.get<GroupCompany>(`/api/group-company/${id}`);
  return data;
};

export const insertGroupCompany = async (payload: GroupCompanyPayload): Promise<GroupCompany> => {
  const { data } = await apiClient.post<GroupCompany>('/api/group-company', payload);
  return data;
};

export const updateGroupCompany = async (id: number, payload: Partial<GroupCompanyPayload>): Promise<GroupCompany> => {
  const { data } = await apiClient.put<GroupCompany>(`/api/group-company/${id}`, payload);
  return data;
};

export const deleteGroupCompany = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/group-company/${id}`);
};