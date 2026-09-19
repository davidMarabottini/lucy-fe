export type WorkerField = {
  employee_id: number | string;
  range_date: [string | null, string | null];
};

export type AddEmployeeFormValues = {
  workers: WorkerField[];
};

export type ContractEmployeesTableProps = {
  employees: Array<{ id: number; name: string; surname: string; libemax_id: string }>;
};