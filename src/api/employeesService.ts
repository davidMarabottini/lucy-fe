import apiClient from "./apiClient";

export type EmployeeContractAssignment = {
  assignment_id: number;
  start_date: string;
  end_date: string | null;
  employee: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    libemax_id: number;
  };
};

export type LibemaxEmployee = {
  id: number;
  libemax_id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
};

export type LibemaxAddEmployee = Omit<LibemaxEmployee, "id">;


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

export const getEmployeesByContractId = async (contractId: number, date?: string): Promise<EmployeeContractAssignment[]> => {
  const { data } = await apiClient.get<EmployeeContractAssignment[]>(`/api/employee-contracts/by-contract/${contractId}`, { params: { date } });
  return data;
};
