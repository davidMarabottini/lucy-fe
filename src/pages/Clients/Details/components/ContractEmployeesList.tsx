import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import type { ContractEmployeeAssignment } from "@/api/types";
import { useClientDetailStore } from "@/zustand/clientDetailState";
import Button from "@/components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { Map, ChevronRight } from "lucide-react";
import cardStyles from "./ContractsCard.module.scss";
import { EmployeeContractDetailsCard } from "@/components/molecules/DetailCards/EmployeeContractDetailsCard/EmployeeContractDetailsCard";

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
            const { employee } = assignment;
            const isSelected = selectedEmployeeLibemaxId === employee.libemax_id;

            return (
              <li key={assignment.assignment_id}>
                <EmployeeContractDetailsCard
                  assignment={assignment}
                  isSelected={isSelected}
                  footer={
                    <>
                      <Button
                        color={isSelected ? "primary" : "custom"}
                        onClick={() =>
                          setSelectedEmployeeLibemaxId(
                            isSelected ? null : employee.libemax_id
                          )
                        }
                        title={t("showMap")}
                      >
                        <Map size={16} />
                      </Button>

                      <Link to={`/employees/${employee.id}`}>
                        <Button color="custom" title={t("goToEmployee")}>
                          <ChevronRight size={16} />
                        </Button>
                      </Link>
                    </>
                  }
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

