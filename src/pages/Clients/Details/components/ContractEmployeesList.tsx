import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import EmployeeAssignmentCard from "@/components/atoms/EmployeeAssignmentCard/EmployeeAssignmentCard";
import type { ContractEmployeeAssignment } from "@/api/contractService";
import cardStyles from "./ContractsCard.module.scss";

interface ContractEmployeesListProps {
  employees: ContractEmployeeAssignment[];
}

export const ContractEmployeesList = ({ employees }: ContractEmployeesListProps) => {
  const { t } = useTranslation("client", { keyPrefix: "details.contracts.employees" });

  return (
    <div className={cardStyles["c-contracts-card__employees-section"]}>
      <Typography variant="h4" additionalClasses={cardStyles["c-contracts-card__employees-title"]}>
        {t("subtitle")}
      </Typography>
      {employees.length > 0 ? (
        <ul className={cardStyles["c-contracts-card__employees-list"]}>
          {employees.map((assignment) => (
            <li key={assignment.assignment_id}>
              <EmployeeAssignmentCard assignment={assignment} />
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body">{t("noEmployees")}</Typography>
      )}
    </div>
  );
};
