import Card from "@components/atoms/Card/Card";
import clsx from "clsx";
import styles from "../Details.module.scss";
import Form from "@/components/organisms/form/Form";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";
import Stack from "@/components/atoms/Stack/Stack";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import { useAddEmployeeToContract } from "@/hooks/api/ContractHooks";
import { useGetAllEmployeesByContractId } from "@/hooks/api/useEmployeesHooks";
import { Fragment } from "react/jsx-runtime";
import { EmployeeContractDetailsCard } from "@/components/molecules/DetailCards/EmployeeContractDetailsCard/EmployeeContractDetailsCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
  const { data: assignedEmployees, isLoading: isAssignedEmployeesLoading, error: assignedEmployeesError } = useGetAllEmployeesByContractId(contractId);
  const onSubmit = (values: AddEmployeeFormValues) => {
    if (!values.start_date || !values.end_date) return;
    addEmployeeToContract({ workers: values.workers, start_date: values.start_date, end_date: values.end_date });
  }
  return (
    <>
      <Card additionalClassName={clsx(styles["p-contract-detail__card"], styles["p-contract-detail__card-title"])}>
       {isAssignedEmployeesLoading ? (
          <div>{t("addEmployee.assignedEmployees.loading")}</div>
        ) : assignedEmployeesError ? (
          <div>{t("addEmployee.assignedEmployees.error")}</div>
        ) : (
          <Fragment>
          <Typography variant="h2">{t("addEmployee.title")}</Typography>
          <div className={styles["p-contract-detail__assigned-employees"]}>
            {assignedEmployees && assignedEmployees.length > 0 ? (
              assignedEmployees.map((assignment) => (
                  <EmployeeContractDetailsCard
                    assignment={assignment}
                    footer={
                      <Link to={`/employees/${assignment.employee.id}`} title={t("goToEmployee")}>
                        <ChevronRight size={16} />
                      </Link>
                    }
                  />
              ))
            ) : (
              <div>
                {t("addEmployee.assignedEmployees.noEmployees")}
              </div>
            )}
          </div>
          </Fragment>
        )}
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
              />
              <Form.DatePicker
                name="start_date"
                label={t("addEmployee.form.start_date.label")}
              />
              <Form.DatePicker
                name="end_date"
                label={t("addEmployee.form.end_date.label")}
              />
              <Button type="submit">{t("addEmployee.form.save")}</Button>
            </Stack>
          }
        </Form>
      </Card>
    </>
  );
};

export default CardEmployee;
