import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Typography from "@/components/atoms/Typography/Typography";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import Button from "@/components/atoms/Button/Button";
import Table from "@/components/organisms/Table/Table";

import type { AddEmployeeFormValues, ContractEmployeesTableProps } from "../SetDetails.types";


export const ContractEmployeesTable = ({ employees }: ContractEmployeesTableProps) => {
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });
  const { control } = useFormContext<AddEmployeeFormValues>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workers",
  });

  const tableData = fields.map((field, index) => ({ ...field, index }));

  const employeeOptions = employees.map(emp => ({
    value: `${emp.id}`,
    label: `${emp.name} ${emp.surname} (libemax: ${emp.libemax_id})`
  }));

  const columns = [
    {
      key: "employee_id",
      header: t("addEmployee.form.employee.label"),
      value: (row: any) => (
        <Form.Select
          name={`workers.${row.index}.employee_id`}
          options={employeeOptions}
          rules={{ required: t("addEmployee.form.employee.error") }}
        />
      ),
    },
    {
      key: "range_date",
      header: t("addEmployee.form.start_date.label"),
      value: (row: any) => (
        <Form.DatePicker
          name={`workers.${row.index}.range_date`}
          selectsRange={true}
          rules={{ required: t("addEmployee.form.start_date.error") }}
        />
      ),
    },
  ];

  const actions = (row: any) => [
    <Button 
      key="delete" 
      type="button" 
      onClick={() => remove(row.index)}
    >
      {t("addEmployee.form.remove", "Rimuovi")}
    </Button>
  ];

  return (
    <Stack>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="button" 
          onClick={() => append({ employee_id: "", range_date: [null, null] })}
        >
          {t("addEmployee.form.add", "+ Aggiungi Dipendente")}
        </Button>
      </div>

      {fields.length > 0 ? (
        <Table
          data={tableData}
          columns={columns}
          actions={actions}
          getRowKey={(row) => row.id} 
        />
      ) : (
        <Typography>
          {t("addEmployee.form.empty", "Nessun dipendente assegnato. Clicca su Aggiungi per iniziare.")}
        </Typography>
      )}
    </Stack>
  );
};