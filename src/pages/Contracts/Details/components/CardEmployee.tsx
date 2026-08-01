import Card from "@components/atoms/Card/Card";
// import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "../Details.module.scss";
import Form from "@/components/organisms/form/Form";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";
import Stack from "@/components/atoms/Stack/Stack";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import { useAddEmployeeToContract } from "@/hooks/api/ContractHooks";

// TODO: da capire se duplicato
type AddEmployeeFormValues = {
  workers: number[];
  start_date: string | null;
  end_date: string | null;
};

const CardEmployee = ({ contractId }: { contractId: number }) => {
  const {data: employees, isLoading, error, isSuccess} = useEmployeesList();
  const {t} = useTranslation("contract", { keyPrefix: "details" });
  const { mutate: addEmployeeToContract } = useAddEmployeeToContract(contractId);
  const onSubmit = (values: AddEmployeeFormValues) => {
    if (!values.start_date || !values.end_date) return;
    addEmployeeToContract({ workers: values.workers, start_date: values.start_date, end_date: values.end_date });
  }
  return (
    <>
      <Card additionalClassName={clsx(styles["p-contract-detail__card"])}>
        <Typography className={styles["p-contract-detail__card-title"]} variant="h2">{t("addEmployee.title")}</Typography>
        <Form onSubmit={onSubmit}
          defaultValues={{
            workers: [],
            start_date: null,
            end_date: null,
          }}>
          {isLoading && <div>Loading...</div>}
          {error && <div>{t("addEmployee.form.employee.error")}</div>}
          {isSuccess && 
            <Stack>
              <Form.FilteredDualListBox
                name="workers"
                label={t("addEmployee.form.employee.label")}
                options={employees.map(employee => ({ label: `${employee.name} ${employee.surname} (libemax: ${employee.libemax_id})`, id: employee.id }))}
                rules={{ required: t("addEmployee.form.employee.error") }}
              />
              <div className={styles["p-contract-detail__date-row"]}>
              <Form.DatePicker
                name="start_date"
                className={styles["p-contract-detail__date"]}
                label={t("addEmployee.form.start_date.label")}
                rules={{ required: t("addEmployee.form.start_date.error") }}
              />
              <Form.DatePicker
                name="end_date"
                className={styles["p-contract-detail__date"]}
                label={t("addEmployee.form.end_date.label")}
                rules={{ required: t("addEmployee.form.end_date.error") }}
              />
              </div>
              <Button type="submit">{t("addEmployee.form.save")}</Button>
            </Stack>
          }
        </Form>
      </Card>
    </>
  );
};

export default CardEmployee;
