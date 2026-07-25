import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEmployeesList } from "@/hooks/api/useEmployeesHooks";
import { useAddEmployeeToContract } from "@/hooks/api/ContractHooks";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";

type ModalEmployeeProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  contractId: number;
};

type AddEmployeeFormValues = {
  workers: number[];
  start_date: string | null;
  end_date: string | null;
};

const ModalEmployee = ({ openModal, setOpenModal, contractId }: ModalEmployeeProps) => {
  const { data: employees, isLoading, error, isSuccess } = useEmployeesList();
  const { t } = useTranslation("contract", { keyPrefix: "details" });
  const { mutate: addEmployeeToContract } = useAddEmployeeToContract(contractId);

  const onSubmit = (data: AddEmployeeFormValues) => {
    addEmployeeToContract(data, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        workers: [],
        start_date: null,
        end_date: null,
      }}
    >
      <Modal
        header={t("addEmployee.assignedEmployees.title")}
        open={openModal}
        setOpen={setOpenModal}
        btnList={[
          <Button key="submit" type="submit">
            <Check size={16} /> {t("addEmployee.form.save")}
          </Button>,
        ]}
      >
        {isLoading && <div>Loading employees...</div>}
        {error && <div>{t("addEmployee.form.employee.error")}</div>}
        {isSuccess && employees && (
          <Stack>
            <Form.FilteredDualListBox
              name="workers"
              label={t("addEmployee.form.employee.label")}
              options={employees.map((employee) => ({
                label: `${employee.name} ${employee.surname} (libemax: ${employee.libemax_id})`,
                id: employee.id,
              }))}
            />
            <div className="l-grid" style={{ marginTop: "1rem" }}>
              <div className="l-grid__col l-grid__col--span-6">
                <Form.DatePicker name="start_date" label={t("addEmployee.form.start_date.label")} />
              </div>
              <div className="l-grid__col l-grid__col--span-6">
                <Form.DatePicker name="end_date" label={t("addEmployee.form.end_date.label")} />
              </div>
            </div>
          </Stack>
        )}
      </Modal>
    </Form>
  );
};

export default ModalEmployee;