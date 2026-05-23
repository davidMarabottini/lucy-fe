import { Mail, Phone, CalendarCheck, CalendarX } from "lucide-react";
import styles from "./EmployeeAssignmentCard.module.scss";
import type { ContractEmployeeAssignment } from "@/api/contractService";

interface EmployeeAssignmentCardProps {
  assignment: ContractEmployeeAssignment;
}

const EmployeeAssignmentCard = ({ assignment }: EmployeeAssignmentCardProps) => {
  const { employee, start_date, end_date } = assignment;
  const initials = `${employee.name[0]}${employee.surname[0]}`;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("it-IT");

  return (
    <div className={styles["c-employee-assignment-card"]}>
      <div className={styles["c-employee-assignment-card__header"]}>
        <div className={styles["c-employee-assignment-card__avatar"]}>{initials}</div>
        <div>
          <div className={styles["c-employee-assignment-card__name"]}>
            {employee.name} {employee.surname}
          </div>
          <div className={styles["c-employee-assignment-card__libemax-id"]}>
            ID Libemax: {employee.libemax_id}
          </div>
        </div>
      </div>

      <div className={styles["c-employee-assignment-card__contacts"]}>
        {employee.phone && (
          <div className={styles["c-employee-assignment-card__contact-row"]}>
            <Phone size={12} />
            {employee.phone}
          </div>
        )}
        {employee.email && (
          <div className={styles["c-employee-assignment-card__contact-row"]}>
            <Mail size={12} />
            {employee.email}
          </div>
        )}
      </div>

      <div className={styles["c-employee-assignment-card__dates"]}>
        <div className={styles["c-employee-assignment-card__date"]}>
          <CalendarCheck size={12} />
          <span className={styles["c-employee-assignment-card__date-label"]}>Dal</span>
          {formatDate(start_date)}
        </div>
        <div className={styles["c-employee-assignment-card__date"]}>
          <CalendarX size={12} />
          <span className={styles["c-employee-assignment-card__date-label"]}>Al</span>
          {formatDate(end_date)}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAssignmentCard;
