import apiClient from "./apiClient";
import type { LibemaxClient } from "./clientService";
import type { GroupCompany } from "./groupCompanyService";


export interface Contract {
  "client": LibemaxClient,
  "contract_code": string,
  "description": string,
  "end_date": string,
  "id": number,
  "provider": GroupCompany,
  "start_date": string
}

export type ContractPayload = Omit<Contract, 'id'>;

//TODO: definire meglio i tipi di ritorno, magari con un oggetto paginato se serve
export const getContracts = async (params?: Record<string, unknown>): Promise<unknown> => {
  const { data } = await apiClient.get('/api/contracts', { params });
  return data;
};

// export const getContracts = async (params?: { 
//   page?: number; 
//   per_page?: number; 
//   search?: string; 
//   raw?: boolean 
// }): Promise<Contract> => {
//   const { data } = await apiClient.get('/api/contracts', { 
//     params
//   });
//   return data;
// };


export const getContractById = async (id: number): Promise<Contract> => {
  const { data } = await apiClient.get<Contract>(`/api/contracts/${id}`);
  return data;
};

export const insertContract = async (payload: ContractPayload): Promise<Contract> => {
  const { data } = await apiClient.post<Contract>('/api/contracts', payload);
  return data;
};

export const updateContract = async (id: number, payload: Partial<ContractPayload>): Promise<Contract> => {
  const { data } = await apiClient.put<Contract>(`/api/contracts/${id}`, payload);
  return data;
};

export const deleteContract = async (id: number): Promise<{ success: boolean }> => {
  const { data } = await apiClient.delete<{ success: boolean }>(`/api/contracts/${id}`);
  return data;
};