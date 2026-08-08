import { useState, Fragment } from "react";
import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import Paginated from "@/components/organisms/Paginated/Paginated";
import type { WorkSchedule } from "@/api/types";
import { useContractSchedules } from "@/hooks/api/useWorkScheduleHooks";
import Button from "@/components/atoms/Button/Button";
import { Trash2, Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../Details.module.scss";
import Table from "@/components/organisms/Table/Table";
import { useGetAllEmployeesByContractId } from "@/hooks/api/useEmployeesHooks";
import { EmployeeContractDetailsCard } from "@/components/molecules/DetailCards/EmployeeContractDetailsCard/EmployeeContractDetailsCard";

// Modali separate
import ModalFormSchedule from "./ModalFormSchedule";
import ModalEmployee from "./ModalEmployee";

const CardContractDetails = ({
  contractId,
  deleteSchedule,
}: {
  contractId: string;
  deleteSchedule: (id: number) => void;
}) => {
  const { t } = useTranslation("contract", { keyPrefix: "details" });
  
  // Stati per il controllo delle modali
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState<boolean>(false);

  const { data: assignedEmployees } = useGetAllEmployeesByContractId(Number(contractId));

  return (
    <Fragment>
      {/* Sezione 1: Lista Attività / Turni */}
      <Card additionalClassName={styles["p-contract-detail__card"]}>
        <div className={styles["p-contract-detail__card-title-internal"]} style={{ marginBottom: "1rem" }}>
          <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
            {t("activities_list")}
          </Typography>
          <Button onClick={() => setOpenScheduleModal(true)} color="custom">
            <Plus />
          </Button>
        </div>

        <Paginated<WorkSchedule>
          useQueryHook={useContractSchedules}
          initialPerPage={10}
          filterConfig={[
            { key: 'contract_id', placeholder: "", value: contractId, type: 'hidden' },
          ]}
        >
          {(res) => (
            <Table
              data={res}
              columns={[
                {
                  key: 'week_day',
                  header: t('table.day'),
                  value: (row) => row.week_day?.name ?? t('table.flexible'),
                },
                {
                  key: '__time_info',
                  header: t('table.hours'),
                  value: (row) => row.weekly_hours
                    ? `${row.weekly_hours}h ${t('table.weekly_short')}`
                    : `${row.start_time?.substring(0, 5)} - ${row.end_time?.substring(0, 5)}`,
                },
                {
                  key: 'work_activity',
                  header: t('table.activity_type'),
                  value: (row) => row.work_activity?.name ?? '-',
                },
                {
                  key: 'note',
                  header: t('table.note'),
                  value: (row) => row.note ?? '-',
                },
              ]}
              getRowKey={(row) => String(row.id)}
              actions={(row) => [
                 (
                  <Button
                    key="remove"
                    color="custom"
                    additionalClassName={styles["p-companies__btn-delete"]}
                    onClick={() => deleteSchedule(row.id)}
                  >
                    <Trash2 />
                  </Button>
                ),
              ]}
            />
          )}
        </Paginated>
      </Card>

      {/* Sezione 2: Lista Lavoratori Assegnati */}
      <Card additionalClassName={styles["p-contract-detail__card"]}>
        <div className={styles["p-contract-detail__card-title-internal"]} style={{ marginBottom: "1rem" }}>
          <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
            {t("addEmployee.assignedEmployees.title")}
          </Typography>
          <Button onClick={() => setOpenEmployeeModal(true)} color="custom">
            <Plus />
          </Button>
        </div>
        <div className={styles["p-contract-detail__assigned-employees"]}>
          {assignedEmployees && assignedEmployees.length > 0 ? (
            assignedEmployees.map((assignment) => (<div><EmployeeContractDetailsCard
                key={assignment?.employee?.id}
                assignment={assignment}
                action={
                  <Link to={`/employees/${assignment?.employee?.id}`} title={t("goToEmployee")}>
                    <ChevronRight size={16} />
                  </Link>
                }
              /></div>))
          ) : (
            <div>{t("addEmployee.assignedEmployees.noEmployees")}</div>
          )}
          {/* {assignedEmployees && assignedEmployees?.length > 0 ? (
            assignedEmployees.map((assigned) => assigned?.employee && (
              <EmployeeContractDetailsCard
                key={assigned?.employee?.id}
                employee={assigned?.employee}
                action={
                  <Link to={`/employees/${assigned?.employee?.id}`} title={t("goToEmployee")}>
                    <ChevronRight size={16} />
                  </Link>
                }
              />
            ))
          ) : (
            <div>{t("addEmployee.assignedEmployees.noEmployees")}</div>
          )} */}
        </div>
      </Card>

      {/* Modale Inserimento Turno / Attività */}
      <ModalFormSchedule
        openModal={openScheduleModal}
        setOpenModal={setOpenScheduleModal}
        contractId={contractId}
      />

      {/* Modale Gestione Lavoratori */}
      <ModalEmployee
        openModal={openEmployeeModal}
        setOpenModal={setOpenEmployeeModal}
        contractId={Number(contractId)}
      />
    </Fragment>
  );
};

export default CardContractDetails;