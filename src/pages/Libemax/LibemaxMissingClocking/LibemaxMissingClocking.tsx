import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useMissingClockin } from "@/hooks/api/useLibemaxHooks";
import styles from './LibemaxMissingClocking.module.scss';
import Table from "@/components/organisms/Table/Table";
import type { MissingClockin } from "@/api/apiLibemaxIntegration";
import { useTranslation } from "react-i18next";

const MissingClockin = () => {
  const { data: missing, isLoading, error } = useMissingClockin();

  const { t } = useTranslation("libemaxMissingClocking");

  if (isLoading) return <div>{t('additionalMessage.loading')}</div>;
  if (error) return <Typography color="error">{t('additionalMessage.errorLoading')}</Typography>;
  if (!missing || missing.length === 0) return <></>

  return (
    <div className="p-missing-clockin__card-title">
      <Card additionalClassName={styles['p-missing-clockin__card-title']}>
        <div className={styles["p-missing-clockin__card-title-internal"]}>
        <Typography className={styles["p-missing-clockin__title"]} variant="h2">{t("title")}</Typography>
        </div>
      </Card>

      <Card>
        <Table<MissingClockin> 
          data={missing}
          columns={[
          {
            key: 'name',
            header: t('table.name'),
          },{
            key: 'expected_time',
            header: t('table.expected_time'),
          },
          {
            key: 'delay',
            header: t('table.delay'),
          },{
            key: 'phone',
            header: t('table.phone'),
          },
        ]}
      />
      </Card>
    </div>
  );
};

export default MissingClockin;