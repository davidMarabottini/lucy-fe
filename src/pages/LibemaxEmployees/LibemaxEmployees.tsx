import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useLibemaxUsers } from "@/hooks/api/useLibemaxHooks";
import styles from './LibemaxEmployees.module.scss';
import Table from "@/components/organisms/Table/Table";
import type { LibemaxUser } from "@/api/apiLibemaxIntegration";
import { useTranslation } from "react-i18next";

const LibemaxEmployees = () => {
  const { data: employees, isLoading, error } = useLibemaxUsers();
  const {t} = useTranslation("libemaxEmployees");

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <Typography color="error">{t("additionalMessage.errorLoading")}</Typography>;
  if(!employees) return <></> 
  return (
    <div className={styles['p-libemax-employees']}>
      <Card additionalClassName={styles["p-libemax-employees__card-title"]}>
        <div className={styles["p-libemax-employees__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-libemax-employees__title"]}>{t("title")}</Typography>
        </div>
      </Card>
      <Card additionalClassName={styles["p-libemax-employees__card"]}>
        <Table<LibemaxUser[]>
          data={employees}
          columns={
            [
              {key: 'name' as keyof typeof employees, header: t("table.name")},
              {key: 'email' as keyof typeof employees, header: t("table.email")},
              {key: 'phone' as keyof typeof employees, header: t("table.phone")}
            ]
          }
        />
      </Card>
    </div>
  );
};

export default LibemaxEmployees;
