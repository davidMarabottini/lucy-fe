import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import Paginated from "@/components/organisms/Paginated/Paginated";
import type { WorkSchedule } from "@/api/types";
import { useContractSchedules } from "@/hooks/api/useWorkScheduleHooks";
import styles from "../Details.module.scss";
import Table from "@/components/organisms/Table/Table";

const CardContractDetails = ({ contractId }: { contractId: string; }) => {
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });
  return (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
        {t("activities_list")}
      </Typography>

      <Paginated<WorkSchedule>
        area={`contract-schedules-${contractId}`}
        useQueryHook={useContractSchedules}
        initialPerPage={10}
        filterConfig={[
          { key: 'contract_id', placeholder: "", value: contractId, type: 'hidden' },
        ]}
      >
        {(res) => (
          <Table
            data={res}
            columns={[
              {
                key: 'week_day',
                header: t('table.day'),
                value: (row) => row.week_day?.name ?? t('table.flexible'),
              },
              {
                key: '__time_info',
                header: t('table.hours'),
                value: (row) => row.weekly_hours
                  ? `${row.weekly_hours}h / ${row.schedule_type?.frequency} ${row.schedule_type?.period ?? ''}`
                  : `${row.start_time?.substring(0, 5)} - ${row.end_time?.substring(0, 5)}`,
              },
              {
                key: 'work_activity',
                header: t('table.activity_type'),
                value: (row) => row.work_activity?.name ?? '-',
              },
              {
                key: 'note',
                header: t('table.note'),
                value: (row) => row.note ?? '-',
              },
            ]}
            getRowKey={(row) => String(row.id)}
          />
        )}
      </Paginated>
    </Card>
  );
};

export default CardContractDetails;
