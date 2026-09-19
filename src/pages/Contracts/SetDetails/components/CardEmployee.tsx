import clsx from "clsx";
import { useTranslation } from "react-i18next";

import Card from "@components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";

import styles from "../SetDetails.module.scss";
import { useEmployeesList, useGetEmployeesByContractId } from "@/hooks/api/useEmployeesHooks";
import { useSyncEmployeeContract } from "@/hooks/api/ContractHooks";
import type { AddEmployeeFormValues } from "../SetDetails.types";
import { ContractEmployeesTable } from "./ContractEmployeesTable";

const CardEmployee = ({ contractId }: { contractId: number }) => {
  const { data: employees, isLoading: isEmployeesLoading, error: employeesError, isSuccess: isEmployeesSuccess } = useEmployeesList();
  const { data: contractEmployees, isLoading: isContractLoading, error: contractError, isSuccess: isContractSuccess } = useGetEmployeesByContractId(contractId);
  
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });
  const { mutate: addEmployeeToContract } = useSyncEmployeeContract(contractId);
  
  const isLoading = isEmployeesLoading || isContractLoading;
  const error = employeesError || contractError;
  const isSuccess = isEmployeesSuccess && isContractSuccess;

  const onSubmit = (values: AddEmployeeFormValues) => {
    const payload = {
      contract_id: contractId,
      assignments:
        values.workers.map(
          ({
            employee_id,
            range_date: [start_date, end_date]
          }) => ({employee_id: parseInt(employee_id as string, 10), start_date: typeof start_date === 'string' ? new Date(start_date) : start_date, end_date: typeof end_date === 'string' ? new Date(end_date) : end_date})
        )
    };

    console.log('payload', payload)

    addEmployeeToContract(payload);
  };

  return (
    <Card additionalClassName={clsx(styles["p-contract-detail__card"])}>
      <Typography className={styles["p-contract-detail__card-title"]} variant="h2">
        {t("addEmployee.title")}
      </Typography>
      
      {isLoading && <div>Loading...</div>}
      {error && <div>{t("addEmployee.form.employee.error")}</div>}
      
      {isSuccess && (
        <Form<AddEmployeeFormValues>
          onSubmit={onSubmit}
          defaultValues={{
            // Se il BE restituisce date storiche, mappale qui altrimenti inserisci null
            workers: contractEmployees?.map(ce => ({
              employee_id: `${ce.employee.id}`,
              range_date: [ce.start_date || null, ce.end_date || null]
            })) || []
          }}
        >
          <Stack>
            <ContractEmployeesTable employees={employees} />
            <Form.Button type="submit">{t("addEmployee.form.save")}</Form.Button>
          </Stack>
        </Form>
      )}
    </Card>
  );
};

export default CardEmployee;
