import apiClient from "./apiClient";
import type { Contract, ContractPayload, ContractEmployeeAssignment } from "./types";
import type { PaginatedData } from "@/types/utilities.types";

export const getContracts = async (params?: Record<string, unknown>): Promise<PaginatedData<Contract>> => {
  const { data } = await apiClient.get('/api/contracts', { params });
  return data;
};


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

export const addEmployeeToContract = async (contractId: number, workers: number[], startDate: string, endDate: string): Promise<void> => {
  await Promise.all(
    workers.map(employeeId =>
      apiClient.post(`/api/employee-contracts`, {
        contract_id: contractId,
        employee_id: employeeId,
        start_date: startDate,
        end_date: endDate,
      })
    )
  );
};

export const getEmployeesByContract = async (contractId: number, date: string): Promise<ContractEmployeeAssignment[]> => {
  const { data } = await apiClient.get<ContractEmployeeAssignment[]>(`/api/employee-contracts/by-contract/${contractId}`, { params: { date } });
  return data;
}