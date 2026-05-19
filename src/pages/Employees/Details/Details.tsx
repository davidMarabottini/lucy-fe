import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useEmployeeDetail } from "@/hooks/api/useEmployeesHooks";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft } from "lucide-react";
import styles from './Details.module.scss'
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import EmployeeInfoCard from "./components/EmployeeInfoCard";

const EmployeeDetailPage = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data, isLoading, error } = useEmployeeDetail(Number(employeeId));
  const { t } = useTranslation("employee", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return <></>;

  return (
    <div>
      <Card additionalClassName={clsx(styles["p-employee-detail__card"], styles["p-employee-detail__card-title"])}>
        <div className={styles["p-employee-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-employee-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.LIBEMAX_EMPLOYEES}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <EmployeeInfoCard employee={data} />
    </div>
  );
};

export default EmployeeDetailPage;
