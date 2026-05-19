import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { Mail, Phone } from "lucide-react";
import type { LibemaxEmployee } from "@/api/employeesService";

const EmployeeInfoCard = ({ employee }: { employee?: LibemaxEmployee }) => {
  const { t } = useTranslation("employee", { keyPrefix: "details" });
  return (
    <Card additionalClassName={styles["p-employee-detail__card"]}>
      <div className={styles["p-employee-detail__container"]}>
        <Typography variant="h2" additionalClasses={styles["p-employee-detail__title"]}>
          {t("employee.subtitle")}
        </Typography>
        <div>
          <Typography variant="h4">{employee?.name} {employee?.surname}</Typography>
        </div>

        <div className={styles["p-employee-detail__employee-sheet"]}>
          <div className={styles["p-employee-detail__detail-column"]}>
            <Typography variant="h4" className={styles['p-employee-detail__subtitle-section']}>
              {t("section.contact")}
            </Typography>
            <div>
              {employee?.phone && <div><Phone /> {employee.phone}</div>}
              {employee?.email && <div><Mail /> {employee.email}</div>}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EmployeeInfoCard;
