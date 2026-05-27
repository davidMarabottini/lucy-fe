import { useTranslation } from "react-i18next";
import * as Lucide from "lucide-react";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import { useContractSchedules } from "@/hooks/api/useWorkScheduleHooks";
import type { WorkSchedule } from "@/api/types";
import { getTodayWeekDayId } from "@/utils/weekDay";
import cardStyles from "./ContractsCard.module.scss";

interface ContractSchedulesTableProps {
  contractId: number;
  selectedDate: string;
}

export const ContractSchedulesTable = ({ contractId, selectedDate }: ContractSchedulesTableProps) => {
  const { t } = useTranslation("client", { keyPrefix: "details.contracts" });

  return (
    <TablePaginated<WorkSchedule>
      key={contractId}
      useQueryHook={useContractSchedules}
      initialPerPage={10}
      filterConfig={[
        { key: 'contract_id', placeholder: '', value: String(contractId), type: 'hidden' }
      ]}
      columns={[
        {
          key: '__icon',
          header: '',
          value: (row) => {
            const DynamicIcon = (Lucide as unknown as Record<string, Lucide.LucideIcon>)[row?.schedule_type?.icon_name ?? 'minus'] ?? Lucide.HelpCircle;
            return <DynamicIcon />;
          },
        },
        {
          key: 'week_day',
          header: t('schedules.table.day'),
          value: (row) => (
            <span className={cardStyles["c-contracts-card__week-day-cell"]}>
              {row.week_day_id != null && row.week_day_id === getTodayWeekDayId(selectedDate) && (
                <Lucide.Check size={14} color="green" />
              )}
              {row.week_day?.name ?? t('schedules.table.flexible')}
            </span>
          ),
        },
        {
          key: '__time_info',
          header: t('schedules.table.hours'),
          value: (row) => {
            if (row.weekly_hours) {
              return `${row.weekly_hours}h ${t('schedules.table.weekly_short')}`;
            }

            const start = row.start_time?.substring(0, 5);
            const end = row.end_time?.substring(0, 5);
            return start && end ? `${start} - ${end}` : '-';
          },
        },
        {
          key: 'work_activity',
          header: t('schedules.table.activity_type'),
          value: (row) => row.work_activity?.name ?? '-',
        },
        {
          key: 'note',
          header: t('schedules.table.note'),
          value: (row) => row.note ?? '-',
        },
      ]}
      getRowKey={(row) => String(row.id)}
    />
  );
};
