import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import type { ContractEmployeeAssignment } from "@/api/contractService";
import { useClientDetailStore } from "@/zustand/clientDetailState";
import Button from "@/components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { CalendarCheck, CalendarX, Mail, Map, Phone, ChevronRight } from "lucide-react";
import cardStyles from "./ContractsCard.module.scss";
import listStyles from "./ContractEmployeesList.module.scss";

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("it-IT");

interface ContractEmployeesListProps {
  employees: ContractEmployeeAssignment[];
}

export const ContractEmployeesList = ({ employees }: ContractEmployeesListProps) => {
  const { t } = useTranslation("client", { keyPrefix: "details.contracts.employees" });
  const selectedEmployeeLibemaxId = useClientDetailStore((s) => s.selectedEmployeeLibemaxId);
  const setSelectedEmployeeLibemaxId = useClientDetailStore((s) => s.setSelectedEmployeeLibemaxId);

  return (
    <div className={cardStyles["c-contracts-card__employees-section"]}>
      <Typography variant="h4" additionalClasses={cardStyles["c-contracts-card__employees-title"]}>
        {t("subtitle")}
      </Typography>
      {employees.length > 0 ? (
        <ul className={cardStyles["c-contracts-card__employees-list"]}>
          {employees.map((assignment) => {
            const { employee, start_date, end_date } = assignment;
            const initials = `${employee.name[0]}${employee.surname[0]}`;
            const isSelected = selectedEmployeeLibemaxId === employee.libemax_id;

            return (
              <li key={assignment.assignment_id}>
                <DetailCard
                  isSelected={isSelected}
                  header={
                    <div className={listStyles["c-employee-list__dates"]}>
                      <span className={listStyles["c-employee-list__date"]}>
                        <CalendarCheck size={12} />
                        <span className={listStyles["c-employee-list__date-label"]}>Dal</span>
                        {formatDate(start_date)}
                      </span>
                      <span className={listStyles["c-employee-list__date"]}>
                        <CalendarX size={12} />
                        <span className={listStyles["c-employee-list__date-label"]}>Al</span>
                        {formatDate(end_date)}
                      </span>
                    </div>
                  }
                  body={
                    <div className={listStyles["c-employee-list__body"]}>
                      <div className={listStyles["c-employee-list__avatar"]}>{initials}</div>
                      <div className={listStyles["c-employee-list__info"]}>
                        <div className={listStyles["c-employee-list__name"]}>
                          {employee.name} {employee.surname}
                        </div>
                        <div className={listStyles["c-employee-list__libemax-id"]}>
                          ID Libemax: {employee.libemax_id}
                        </div>
                        {employee.phone && (
                          <div className={listStyles["c-employee-list__contact"]}>
                            <Phone size={12} />
                            {employee.phone}
                          </div>
                        )}
                        {employee.email && (
                          <div className={listStyles["c-employee-list__contact"]}>
                            <Mail size={12} />
                            {employee.email}
                          </div>
                        )}
                      </div>
                    </div>
                  }
                  actions={[
                    <Button
                      key="map"
                      color={isSelected ? "primary" : "custom"}
                      onClick={() => setSelectedEmployeeLibemaxId(isSelected ? null : employee.libemax_id)}
                      title={t("showMap")}
                    >
                      <Map size={16} />
                    </Button>,
                    <Link key="detail" to={`/employees/${employee.id}`}>
                      <Button color="custom" title={t("goToEmployee")}>
                        <ChevronRight size={16} />
                      </Button>
                    </Link>,
                  ]}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <Typography variant="body">{t("noEmployees")}</Typography>
      )}
    </div>
  );
};

