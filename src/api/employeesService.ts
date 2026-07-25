import apiClient from "./apiClient";
import type { LibemaxEmployee, LibemaxAddEmployee, ContractEmployeeAssignment } from "./types";

export const getLibemaxEmployees = async (params?: Record<string, unknown>): Promise<LibemaxEmployee[]> => {
  const { data } = await apiClient.get("/api/employees", { params });
  return data;
};

export const insertEmployee = async (
  employee: LibemaxAddEmployee
): Promise<LibemaxAddEmployee> => {
  const {data} = await apiClient.post('/api/employees', employee)

  return data
}

export const getEmployeeDetail = async (employeeId: number): Promise<LibemaxEmployee> => {
  const { data } = await apiClient.get(`/api/employees/${employeeId}`);
  return data;
};

export const deleteEmployee = async (employeeId: number): Promise<{ success: boolean }> => {
  const { data } = await apiClient.delete(`/api/employees/${employeeId}`);
  return data;
};

export const getEmployeesByContractId = async (contractId: number, date?: string): Promise<ContractEmployeeAssignment[]> => {
  const { data } = await apiClient.get<ContractEmployeeAssignment[]>(`/api/employee-contracts/by-contract/${contractId}`, { params: { date } });
  return data;
};


export const getAllEmployeesByContractId = async (contractId: number): Promise<ContractEmployeeAssignment[]> => {
  const { data } = await apiClient.get<ContractEmployeeAssignment[]>(`/api/employee-contracts/get-all-by-contract/${contractId}`);
  return data;
};
