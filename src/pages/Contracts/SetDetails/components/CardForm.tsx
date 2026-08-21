import Card from "@components/atoms/Card/Card";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { WeekDay, WorkScheduleAdd } from "@/api/types";
import { useContractSchedules, useInsertWorkSchedule, useSyncWorkSchedules } from "@/hooks/api/useWorkScheduleHooks";
import clsx from "clsx";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import { useWeekDays } from "@/hooks/api/WeekDaysHooks";
import * as LucideIcons from "lucide-react";
import styles from "../SetDetails.module.scss";
import Table from "@/components/organisms/Table/Table";
import { useMemo } from "react";

type WorkScheduleFormValues = {
  schedule_type_id: string;
  week_day_id: string;
  weekly_hours: string;
  start_time: string;
  end_time: string;
  note: string;
  start_time_monday?: string;
  end_time_monday?: string;
  start_time_tuesday?: string;
  end_time_tuesday?: string;
  start_time_wednesday?: string;
  end_time_wednesday?: string;
  start_time_thursday?: string;
  end_time_thursday?: string;
  start_time_friday?: string;
  end_time_friday?: string;
  start_time_saturday?: string;
  end_time_saturday?: string;
  start_time_sunday?: string;
  end_time_sunday?: string;
};

const CardForm = ({ contractId }: { contractId: string }) => {
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });
  const { classBase, ...iconPresetRest } = ICON_PRESET;
  const { data: scheduleTypes } = useWorkScheduleTypes();
  const { data: weekDays } = useWeekDays();
  const { data: contractSchedules } = useContractSchedules({ contract_id: Number(contractId) });
  const { mutate: syncWorkSchedules } = useSyncWorkSchedules(Number(contractId));

  // Mappa gli orari salvati per pre-popolare i default values in modo pulito
  const initialValues = useMemo(() => {
    const values: Record<string, string> = {
      schedule_type_id: contractSchedules?.[0]?.schedule_type_id ? String(contractSchedules[0].schedule_type_id) : '',
      weekly_hours: contractSchedules?.[0]?.weekly_hours ? String(contractSchedules[0].weekly_hours) : '',
      note: contractSchedules?.[0]?.note ?? '',
    };

    contractSchedules?.forEach(s => {
      if (s.week_day?.name) {
        const day = s.week_day.name.toLowerCase();
        values[`start_time_${day}`] = s.start_time ?? '';
        values[`end_time_${day}`] = s.end_time ?? '';
      }
    });

    return values;
  }, [contractSchedules]);

  return (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Form<WorkScheduleFormValues>
        enableReinitialize // Assicurati che il tuo wrapper Form supporti reset/reinitialize al cambio di initialValues
        defaultValues={initialValues}
        onSubmit={(values) => {
          const payload: WorkScheduleAdd = {
            schedule_type_id: Number(values.schedule_type_id),
            weekly_hours: values.weekly_hours ? Number(values.weekly_hours) : undefined,
            note: values.note || undefined,
            contract_id: Number(contractId),
            start_time_monday: values.start_time_monday || undefined,
            end_time_monday: values.end_time_monday || undefined,
            start_time_tuesday: values.start_time_tuesday || undefined,
            end_time_tuesday: values.end_time_tuesday || undefined,
            start_time_wednesday: values.start_time_wednesday || undefined,
            end_time_wednesday: values.end_time_wednesday || undefined,
            start_time_thursday: values.start_time_thursday || undefined,
            end_time_thursday: values.end_time_thursday || undefined,
            start_time_friday: values.start_time_friday || undefined,
            end_time_friday: values.end_time_friday || undefined,
            start_time_saturday: values.start_time_saturday || undefined,
            end_time_saturday: values.end_time_saturday || undefined,
            start_time_sunday: values.start_time_sunday || undefined,
            end_time_sunday: values.end_time_sunday || undefined,
          };
          
          syncWorkSchedules(payload);
        }}
      >
        {({ watch }) => {
          const selectedTypeId = watch("schedule_type_id");
          const workType = scheduleTypes?.find(st => String(st.id) === String(selectedTypeId)) ?? null;

          return (
            <Stack spacing="md">
              <div className="l-grid">
                <Form.RadioBtn
                  name="schedule_type_id"
                  label={t("form.type.label")}
                  className={clsx(classBase, "l-grid__col l-grid__col--span-12")}
                  gap="lg"
                  options={scheduleTypes?.map(st => {
                    const DynamicIcon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[st.icon_name] ?? LucideIcons.HelpCircle;
                    return { label: st.description ?? '', value: String(st.id), Icon: DynamicIcon };
                  }) ?? []}
                  {...iconPresetRest}
                />

                {workType && !['NONE', 'FIXED'].includes(workType.period) && (
                  <Form.Input
                    className="l-grid__col l-grid__col--span-6"
                    name="weekly_hours"
                    type="number"
                    label={t("form.weekly_hours.label")}
                  />
                )}
                <Form.TextArea
                  className="l-grid__col l-grid__col--span-12"
                  name="note"
                  label={t("form.note.label")}
                  rows={2}
                />
              </div>

              {weekDays && (
                <Table<WeekDay>
                  data={weekDays}
                  columns={[
                    {
                      key: 'name',
                      header: t('form.day.label'),
                      value: (row) => row.name ?? '-',
                    },
                    {
                      key: '__start_time',
                      header: t('form.start.label'),
                      value: ({ name }) => (
                        <Form.Input
                          name={`start_time_${name.toLowerCase()}`}
                          type="time"
                          label={t("form.start.label")}
                        />
                      ),
                    },
                    {
                      key: '__end_time',
                      header: t('form.end.label'),
                      value: ({ name }) => (
                        <Form.Input
                          name={`end_time_${name.toLowerCase()}`}
                          type="time"
                          label={t("form.end.label")}
                        />
                      ),
                    },
                  ]}
                  getRowKey={(row) => String(row.id)}
                />
              )}

              <div className={styles["p-contract-detail__contract-form-btns-row"]}>
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
  );
};

// import Card from "@components/atoms/Card/Card";
// import { Check, X } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import type { WeekDay, WorkScheduleAdd } from "@/api/types";
// import { useContractSchedules, useInsertWorkSchedule, useSyncWorkSchedules } from "@/hooks/api/useWorkScheduleHooks";
// import clsx from "clsx";
// import Form from "@/components/organisms/form/Form";
// import Stack from "@/components/atoms/Stack/Stack";
// import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
// import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
// import { useWeekDays } from "@/hooks/api/WeekDaysHooks";
// import * as LucideIcons from "lucide-react";
// import styles from "../SetDetails.module.scss";
// import Table from "@/components/organisms/Table/Table";

// type WorkScheduleFormValues = {
//   schedule_type_id: string;
//   week_day_id: string;
//   weekly_hours: string;
//   start_time: string;
//   end_time: string;
//   note: string;
//   start_time_monday?: string;
//   end_time_monday?: string;
//   start_time_tuesday?: string;
//   end_time_tuesday?: string;
//   start_time_wednesday?: string;
//   end_time_wednesday?: string;
//   start_time_thursday?: string;
//   end_time_thursday?: string;
//   start_time_friday?: string;
//   end_time_friday?: string;
//   start_time_saturday?: string;
//   end_time_saturday?: string;
//   start_time_sunday?: string;
//   end_time_sunday?: string;
// };

// const CardForm = ({ contractId }: { contractId: string }) => {
//   const { t } = useTranslation("features/contract", { keyPrefix: "details" });
//   const { classBase, ...iconPresetRest } = ICON_PRESET;
//   const { data: scheduleTypes } = useWorkScheduleTypes();
//   const { data: weekDays } = useWeekDays();
//   // const { data: workSchedule } = useWorkSchedules();
//   const { data: contractSchedules } = useContractSchedules({ contract_id: Number(contractId) });
//   const { mutate: syncWorkSchedules } = useSyncWorkSchedules(Number(contractId));
//   console.log('contractSchedules', contractSchedules);

//   return (
//     <Card additionalClassName={styles["p-contract-detail__card"]}>
//       <Form<WorkScheduleFormValues>
//         onSubmit={(values) => {
//           console.log('valori', values);
//           const payload: WorkScheduleAdd = {
//             schedule_type_id: Number(values.schedule_type_id),
//             week_day_id: values.week_day_id ? Number(values.week_day_id) : undefined,
//             weekly_hours: values.weekly_hours ? Number(values.weekly_hours) : undefined,
//             start_time: values.start_time || undefined,
//             end_time: values.end_time || undefined,
//             note: values.note || undefined,
//             contract_id: Number(contractId),
//             start_time_monday: values.start_time_monday || undefined,
//             end_time_monday: values.end_time_monday || undefined,
//             start_time_tuesday: values.start_time_tuesday || undefined,
//             end_time_tuesday: values.end_time_tuesday || undefined,
//             start_time_wednesday: values.start_time_wednesday || undefined,
//             end_time_wednesday: values.end_time_wednesday || undefined,
//             start_time_thursday: values.start_time_thursday || undefined,
//             end_time_thursday: values.end_time_thursday || undefined,
//             start_time_friday: values.start_time_friday || undefined,
//             end_time_friday: values.end_time_friday || undefined,
//             start_time_saturday: values.start_time_saturday || undefined,
//             end_time_saturday: values.end_time_saturday || undefined,
//             start_time_sunday: values.start_time_sunday || undefined,
//             end_time_sunday: values.end_time_sunday || undefined,
//           };
//           console.log('payload', payload);
//           syncWorkSchedules(payload);
//         }}
//         defaultValues={{
//           schedule_type_id: '',
//           week_day_id: '',
//           weekly_hours: '',
//           start_time: '',
//           end_time: '',
//           note: '',
//         }}
//       >
//         {({ watch }) => {
//           const selectedTypeId = watch("schedule_type_id");
//           const workType = scheduleTypes?.find(st => String(st.id) === String(selectedTypeId)) ?? null;

//           return (
//             <Stack spacing="md">
//               <div className="l-grid">
//                 <Form.RadioBtn
//                   name="schedule_type_id"
//                   label={t("form.type.label")}
//                   className={clsx(classBase, "l-grid__col l-grid__col--span-12")}
//                   // rules={{ required: t("form.type.error") }}
//                   gap="lg"
//                   options={scheduleTypes?.map(st => {
//                     const DynamicIcon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[st.icon_name] ?? LucideIcons.HelpCircle;
//                     return { label: st.description ?? '', value: String(st.id), Icon: DynamicIcon };
//                   }) ?? []}
//                   {...iconPresetRest}
//                 />

//                 {workType && !['NONE', 'FIXED'].includes(workType.period) && (
//                   <Form.Input
//                     className="l-grid__col l-grid__col--span-6"
//                     name="weekly_hours"
//                     type="number"
//                     label={t("form.weekly_hours.label")}
//                   />
//                 )}
//                 <Form.TextArea
//                   className="l-grid__col l-grid__col--span-12"
//                   name="note"
//                   label={t("form.note.label")}
//                   rows={2}
//                 />
//               </div>
//               {weekDays && <Table<WeekDay>
//                   data={weekDays}
//                   columns={[
//                     {
//                       key: 'name',
//                       header: t('form.day.label'),
//                       value: (row) => row.name ?? '-',
//                     },
//                     {
//                       key: '__start_time',
//                       header: t('form.start.label'),
//                       value: ({name}) => <Form.Input
//                         name={`start_time_${name.toLowerCase()}`}
//                         defaultValue={contractSchedules?.find(s => s.week_day?.name.toLowerCase() === name.toLowerCase())?.start_time ?? ''}
//                         type="time"
//                         label={t("form.start.label")}
//                       />,
//                     },
//                     {
//                       key: '__end_time',
//                       header: t('form.end.label'),
//                       value: ({name}) => <Form.Input
//                         name={`end_time_${name.toLowerCase()}`}
//                         defaultValue={contractSchedules?.find(s => s.week_day?.name.toLowerCase() === name.toLowerCase())?.end_time ?? ''}
//                         type="time"
//                         label={t("form.end.label")}
//                       />,
//                     },
//                   ]}
//                   getRowKey={(row) => String(row.id)}
//                 />}

//               <div className={styles["p-contract-detail__contract-form-btns-row"]}>
//                 <Form.Button type="reset" color="secondary" autoDisabled={false}>
//                   <X size={16} /> {t("form.reset")}
//                 </Form.Button>
//                 <Form.Button type="submit">
//                   <Check size={16} /> {t("form.save")}
//                 </Form.Button>
//               </div>
//             </Stack>
//           );
//         }}
//       </Form>
//     </Card>
//   );
// };

export default CardForm;
