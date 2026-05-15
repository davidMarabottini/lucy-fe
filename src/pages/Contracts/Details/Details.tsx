import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useContractDetail } from "@/hooks/api/ContractHooks"; 
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, Calendar, Briefcase, Check, X } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import type { WorkSchedule } from "@/api/workScheduleService";
import { useDeleteWorkSchedule, useInsertWorkSchedule, useWorkSchedules } from "@/hooks/api/useWorkScheduleHooks";
import clsx from "clsx";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import { useState } from "react";
import type { WorkScheduleType } from "@/api/workScheduleTypeService";
import { useWeekDays } from "@/hooks/api/WeekDaysHooks";
import * as LucideIcons from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import { rewriteRoute } from "@/utils/routes";

const ContractDetailPage = () => {
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const { data: scheduleTypes } = useWorkScheduleTypes();
  
  const { contractId } = useParams<{ contractId: string }>();
  const { data, isLoading, error } = useContractDetail(Number(contractId));
  const { data: weekDays } = useWeekDays();
  const { t } = useTranslation("contract", { keyPrefix: "details" });

  const [curWorkType, setCurWorkType] = useState<WorkScheduleType | null>(null);

  const { mutate: insertSchedule } = useInsertWorkSchedule();
  const { mutate: deleteSchedule } = useDeleteWorkSchedule();

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Header */}
      <Card additionalClassName={clsx(styles["p-contract-detail__card"], styles["p-contract-detail__card-title"])}>
        <div className={styles["p-contract-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
            {t("title")}: {data.contract_code}
          </Typography>
          <LinkComponent to={ROUTES.CONTRACT_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {/* Info Contratto */}
      <Card additionalClassName={styles["p-contract-detail__card"]}>
        <div className={styles["p-contract-detail__container"]}>
          <div className={styles["p-contract-detail__header-info"]}>
            <LinkComponent style={{ display: 'flex', gap: '8px' }} to={rewriteRoute(ROUTES.CLIENT_DETAIL, {':clientId': data.client?.id.toString()})} color="primary">
              <LucideIcons.ChevronRight size={20} />
              <Typography variant="h3">{data.client?.name || t("no_client")}</Typography>
            </LinkComponent>
            <Typography variant="body" className="text-gray-500">{data.description}</Typography>
          </div>

          <div className={styles["p-contract-detail__info-grid"]}>
            <div className="flex items-center gap-2">
              <Calendar size={18} /> 
              <strong>{t("fields.period")}:</strong> 
              {data.start_date ? new Date(data.start_date).toLocaleDateString('it-IT') : '...'} - 
              {data.end_date ? new Date(data.end_date).toLocaleDateString('it-IT') : t("ongoing")}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={18} /> 
              <strong>{t("fields.provider")}:</strong> {data.provider?.name}
            </div>
          </div>
        </div>
      </Card>

      <Card additionalClassName={styles["p-contract-detail__card"]}>
        <Form<any>
          onSubmit={(values) => {
            const payload = {
              ...values,
              contract_id: Number(contractId)
            }
            insertSchedule(payload);
          }}
          defaultValues={{
            contract_id: contractId,
            schedule_type_id: '',
            week_day_id: '',
            weekly_hours: '',
            start_time: '',
            end_time: '',
            note: '',
          }}
        >
          {({setValue}) => {
            return (
              <Stack spacing="md">
                <div className="l-grid">
                  <Form.RadioBtn
                    name="schedule_type_id"
                    label={t("form.type.label")}
                    className={clsx(classBase, "l-grid__col l-grid__col--span-12")}
                    rules={{ required: t("form.type.error") }}
                    gap="lg"
                    onChange={(e) => {
                      setCurWorkType(scheduleTypes?.find(st => String(st.id) === String(e.target.value)) || null)
                      setValue("week_day_id", "");
                      setValue("weekly_hours", "");
                      setValue("start_time", "");
                      setValue("end_time", "");
                    }}
                    options={scheduleTypes?.map(st => {
                      const DynamicIcon = (LucideIcons as any)[st.icon_name] || LucideIcons.HelpCircle;

                      return { 
                        label: st.description, 
                        value: String(st.id),
                        Icon: DynamicIcon 
                      };
                    }) || []}
                    {...iconPresetRest}
                  />
                  
                  {curWorkType && !['NONE', 'FIXED'].includes(curWorkType?.period) && (
                    <Form.Input
                      className="l-grid__col l-grid__col--span-6"
                      name="weekly_hours"
                      type="number"
                      label={t("form.weekly_hours.label")}
                    />
                  )}

                  { curWorkType?.period === "FIXED" && (
                    <>
                      <Form.Select
                        className="l-grid__col l-grid__col--span-4"
                        name="week_day_id"
                        label={t("form.day.label")}
                        options={weekDays?.map(d => ({ label: d.name, value: String(d.id) })) || []}
                      />
                      <Form.Input
                        className="l-grid__col l-grid__col--span-4"
                        name="start_time"
                        type="time"
                        label={t("form.start.label")}
                      />
                      <Form.Input
                        className="l-grid__col l-grid__col--span-4"
                        name="end_time"
                        type="time"
                        label={t("form.end.label")}
                      />
                    </>
                  )}
                   <Form.TextArea
                        className="l-grid__col l-grid__col--span-12"
                        name="note"
                        label={t("form.note.label")}
                        rows={2}
                      />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Form.Button type="reset" color="secondary" autoDisabled={false}>
                    <X size={16} /> {t("form.reset")}
                  </Form.Button>
                  <Form.Button type="submit">
                    <Check size={16} /> {t("form.save")}
                  </Form.Button>
                </div>
              </Stack>
            );
          }}
        </Form>
      </Card>

      {/* Tabella WorkSchedules (Attività Pianificate) */}
      <Card additionalClassName={styles["p-contract-detail__card"]}>
        <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
          {t("activities_list")}
        </Typography>
        
        <TablePaginated<WorkSchedule>
          useQueryHook={useWorkSchedules} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_id',placeholder: "", value: contractId, type: 'hidden' },
            { key: 'user_id', placeholder: "", label: t('filters.user_label') }
          ]}  
          
          columns={[
            {
              key: 'week_day',
              header: t('table.day'),
              value: (row) => row.week_day?.name || t('table.flexible')
            },
            {
              key: '__time_info',
              header: t('table.hours'),
              value: (row) => row.weekly_hours 
                ? `${row.weekly_hours}h ${t('table.weekly_short')}`
                : `${row.start_time?.substring(0,5)} - ${row.end_time?.substring(0,5)}`
            },
            {
              key: 'work_activity',
              header: t('table.activity_type'),
              value: (row) => row.work_activity?.name || '-'
            },
            {
              key: 'note',
              header: t('table.note'),
              value: (row) => row.note || '-'
            },
          ]}
          actions={[
            (row) => (
              <Button
                key="remove"
                color="custom"
                additionalClassName={styles["p-companies__btn-delete"]}
                onClick={() => deleteSchedule(row.id) }
              >
                <LucideIcons.Trash2 size={18} />
              </Button>
            ),
          ]}
        />
      </Card>
    </div>
  );
};

export default ContractDetailPage;