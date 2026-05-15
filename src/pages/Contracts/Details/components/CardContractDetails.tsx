import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import type { WorkSchedule } from "@/api/workScheduleService";
import { useContractSchedules } from "@/hooks/api/useWorkScheduleHooks";
import Button from "@/components/atoms/Button/Button";
import { Trash2 } from "lucide-react";
import styles from "../Details.module.scss";

const CardContractDetails = ({
  contractId,
  deleteSchedule,
}: {
  contractId: string;
  deleteSchedule: (id: number) => void;
}) => {
  const { t } = useTranslation("contract", { keyPrefix: "details" });
  return (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
        {t("activities_list")}
      </Typography>

      <TablePaginated<WorkSchedule>
        useQueryHook={useContractSchedules}
        initialPerPage={10}
        filterConfig={[
          { key: 'contract_id', placeholder: "", value: contractId, type: 'hidden' },
        ]}
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
              ? `${row.weekly_hours}h ${t('table.weekly_short')}`
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
        actions={[
          (row) => (
            <Button
              key="remove"
              color="custom"
              additionalClassName={styles["p-companies__btn-delete"]}
              onClick={() => deleteSchedule(row.id)}
            >
              <Trash2 size={18} />
            </Button>
          ),
        ]}
      />
    </Card>
  );
};

export default CardContractDetails;
