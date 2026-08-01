import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
// import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { Mail, Phone, User } from "lucide-react";
import type { LibemaxEmployee } from "@/api/types";

const EmployeeInfoCard = ({ employee }: { employee?: LibemaxEmployee }) => {
    return (
    <Card additionalClassName={styles["p-employee-detail__card"]}>
      <div className={styles["p-employee-detail__container"]} style={{ flexDirection: 'row' }}>
        <User size={180} className={styles["p-employee-detail__icon"]} style={{ borderRadius: "100%", background: "#f0f0f0",  padding: '24px'}} />
          <div>
            <div>
              <Typography variant="h1">{employee?.name} {employee?.surname}</Typography>
            </div>

            <div className={styles["p-employee-detail__employee-sheet"]} style={{ flexDirection: 'row', gap: '16px', alignItems: 'center', marginTop: '32px', marginLeft: '32px' }}>
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
