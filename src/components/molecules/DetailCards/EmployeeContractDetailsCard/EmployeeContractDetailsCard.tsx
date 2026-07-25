import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { CalendarCheck, CalendarX, Mail, Phone } from "lucide-react";
import styles from "./EmployeeContractDetailsCard.module.scss";

import { formatDate } from "@/utils/dates";
import { getInitials } from "@/utils/string";

import type { EmployeeContractDetailsCardProps } from "./EmployeeContractDetailsCard.types";
export const EmployeeContractDetailsCard = ({
  assignment,
  isSelected = false,
  footer,
}: EmployeeContractDetailsCardProps) => {
  const { employee, start_date, end_date } = assignment;

  return (
    <DetailCard
      isSelected={isSelected}
      header={
        <div className={styles["c-employee-contract-details-card__dates"]}>
          <span className={styles["c-employee-contract-details-card__date"]}>
            <CalendarCheck size={12} />
            <span className={styles["c-employee-contract-details-card__date-label"]}>
              Dal
            </span>
            {formatDate(start_date)}
          </span>

          <span className={styles["c-employee-contract-details-card__date"]}>
            <CalendarX size={12} />
            <span className={styles["c-employee-contract-details-card__date-label"]}>
              Al
            </span>
            {end_date ? formatDate(end_date) : "-"}
          </span>
        </div>
      }
      body={
        <div className={styles["c-employee-contract-details-card__body"]}>
          <div className={styles["c-employee-contract-details-card__avatar"]}>
            {getInitials([employee.name, employee.surname])}
          </div>

          <div className={styles["c-employee-contract-details-card__info"]}>
            <div className={styles["c-employee-contract-details-card__name"]}>
              {employee.name} {employee.surname}
            </div>

            <div className={styles["c-employee-contract-details-card__libemax-id"]}>
              ID Libemax: {employee.libemax_id}
            </div>

            {employee.phone && (
              <div className={styles["c-employee-contract-details-card__contact"]}>
                <Phone size={12} />
                {employee.phone}
              </div>
            )}

            {employee.email && (
              <div className={styles["c-employee-contract-details-card__contact"]}>
                <Mail size={12} />
                {employee.email}
              </div>
            )}
          </div>
        </div>
      }
      actions={footer ? [footer] : []}
    />
  );
};