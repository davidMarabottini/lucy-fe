import Card from "@components/atoms/Card/Card";
// import Stack from "@components/atoms/Stack/Stack";
import Typography from "@components/atoms/Typography/Typography";
import { useRemoteClockin } from "@/hooks/api/useLibemaxHooks";
import styles from './LibemaxRemoteClocking.module.scss';
import Table from "@/components/organisms/Table/Table";
import type { RemoteClockin } from "@/api/apiLibemaxIntegration";
import { useTranslation } from "react-i18next";

const RemoteClockin = () => {
  const { data: remote, isLoading, error } = useRemoteClockin();

  const { t } = useTranslation("libemaxRemoteClocking");
  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <Typography color="error">{t("additionalMessage.errorLoading")}</Typography>;
  if (!remote) return <></>
  return (
    <div className="p-remote-clockin">
      <Card additionalClassName={styles['p-remote-clockin__card-title']}>
        <div className={styles["p-remote-clockin__card-title-internal"]}>
          <Typography variant="h2" className={styles['p-remote-clockin__title']}>{t("title")}</Typography>
        </div>
      </Card>

      <Card>
        <Table<RemoteClockin>
          data={remote}
          columns={[
            { key: 'name', header: t("table.name") },
            { key: 'location', header: t("table.location") },
            { key: 'distance', header: t("table.distance") },
            { key: 'phone', header: t("table.phone") },
          ]} />
      </Card>
    </div>
  );
};

export default RemoteClockin;