import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { useContracts } from "@/hooks/api/ContractHooks";
import { useContractSchedules } from "@/hooks/api/useWorkScheduleHooks";
import type { Contract } from "@/api/contractService";
import type { WorkSchedule } from "@/api/workScheduleService";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import Button from "@/components/atoms/Button/Button";
import { Link } from "react-router-dom";
import * as Lucide from "lucide-react";
import { ChevronRight, List, X } from "lucide-react";
import { useState } from "react";
import { getTodayWeekDayId } from "@/utils/weekDay";
import { useClientDetailStore } from "@/zustand/clientDetailState";

export const ContractsCard = ({ clientId }: { clientId: string }) => {
  const { t } = useTranslation("client", { keyPrefix: "details.contracts" });
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const selectedDate = useClientDetailStore((s) => s.selectedDate);

  const toggleContract = (row: Contract) =>
    setSelectedContract(prev => prev?.id === row.id ? null : row);

  return (
    <Card additionalClassName={styles["p-client-detail__card"]}>
      <Typography variant="h2" additionalClasses={styles["p-client-detail__title"]}>
        {t("subtitle")}
      </Typography>

      <TablePaginated<Contract>
        useQueryHook={useContracts}
        initialPerPage={10}
        filterConfig={[
          { key: 'contract_code', placeholder: '', label: 'Cerca Codice' },
          { key: 'description', placeholder: '', label: 'Cerca Descrizione' },
          { key: 'client_id', placeholder: '', label: 'Cerca Cliente', value: clientId, type: 'hidden' }
        ]}
        columns={[
          { key: 'contract_code', header: t('table.contract_code') },
          { key: 'provider', header: t('table.provider'), value: (row) => row.provider?.name || '-' },
          { key: 'client', header: t('table.client'), value: (row) => row.client?.name || '-' },
          { key: 'start_date', header: t('table.start_date'), value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-' },
          { key: 'end_date', header: t('table.end_date'), value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-' },
          { key: 'description', header: t('table.description'), value: (row) => row.description || '-' }
        ]}
        actions={[
          row => (
            <Button
              key="schedules"
              color="custom"
              onClick={() => toggleContract(row)}
              title={t("schedules.subtitle")}
            >
              <List size={18} />
            </Button>
          ),
          row => <Link key="detail" to={`/contracts/${row.id}`}><ChevronRight /></Link>,
        ]}
      />

      {selectedContract && (
        <div className={styles["p-client-detail__schedules-panel"]}>
          <div className={styles["p-client-detail__schedules-header"]}>
            <Typography variant="h4">
              {t("schedules.subtitle")}: {selectedContract.contract_code}
            </Typography>
            <Button color="custom" onClick={() => setSelectedContract(null)}>
              <X size={18} />
            </Button>
          </div>

          <TablePaginated<WorkSchedule>
            key={selectedContract.id}
            useQueryHook={useContractSchedules}
            initialPerPage={10}
            filterConfig={[
              { key: 'contract_id', placeholder: '', value: String(selectedContract.id), type: 'hidden' }
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
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                value: (row) => row.weekly_hours
                  ? `${row.weekly_hours}h ${t('schedules.table.weekly_short')}`
                  : `${row.start_time?.substring(0, 5)} - ${row.end_time?.substring(0, 5)}`,
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
          />
        </div>
      )}
    </Card>
  );
};