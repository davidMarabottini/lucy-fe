import apiClient from "./apiClient";

export type LibemaxEmployee = {
  id: number;
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