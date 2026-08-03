import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
// import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { Mail, Phone, User } from "lucide-react";
import type { LibemaxEmployee } from "@/api/types";

const EmployeeInfoCard = ({ employee }: { employee?: LibemaxEmployee }) => {
    return (
    <Card additionalClassName={styles["p-employee-detail__card"]}>
      <div className={styles["p-employee-detail__container"]}>
        <User size={180} className={styles["p-employee-detail__icon"]} />
          <div>
            <div>
              <Typography variant="h1">{employee?.name} {employee?.surname}</Typography>
            </div>

            <div className={styles["p-employee-detail__employee-sheet"]}>
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
