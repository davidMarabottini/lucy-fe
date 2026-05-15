import Card from "@components/atoms/Card/Card";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { WorkScheduleAdd } from "@/api/workScheduleService";
import { useInsertWorkSchedule } from "@/hooks/api/useWorkScheduleHooks";
import clsx from "clsx";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import { useWeekDays } from "@/hooks/api/WeekDaysHooks";
import * as LucideIcons from "lucide-react";
import styles from "../Details.module.scss";

type WorkScheduleFormValues = {
  schedule_type_id: string;
  week_day_id: string;
  weekly_hours: string;
  start_time: string;
  end_time: string;
  note: string;
};

const CardForm = ({ contractId }: { contractId: string }) => {
  const { t } = useTranslation("contract", { keyPrefix: "details" });
  const { classBase, ...iconPresetRest } = ICON_PRESET;
  const { data: scheduleTypes } = useWorkScheduleTypes();
  const { data: weekDays } = useWeekDays();
  const { mutate: insertSchedule } = useInsertWorkSchedule();

  return (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Form<WorkScheduleFormValues>
        onSubmit={(values) => {
          const payload: WorkScheduleAdd = {
            schedule_type_id: Number(values.schedule_type_id),
            week_day_id: values.week_day_id ? Number(values.week_day_id) : undefined,
            weekly_hours: values.weekly_hours ? Number(values.weekly_hours) : undefined,
            start_time: values.start_time || undefined,
            end_time: values.end_time || undefined,
            note: values.note || undefined,
            contract_id: Number(contractId),
          };
          insertSchedule(payload);
        }}
        defaultValues={{
          schedule_type_id: '',
          week_day_id: '',
          weekly_hours: '',
          start_time: '',
          end_time: '',
          note: '',
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
                  rules={{ required: t("form.type.error") }}
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

                {workType?.period === "FIXED" && (
                  <>
                    <Form.Select
                      className="l-grid__col l-grid__col--span-4"
                      name="week_day_id"
                      label={t("form.day.label")}
                      options={weekDays?.map(d => ({ label: d.name, value: String(d.id), Icon: '' })) ?? []}
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
  );
};

export default CardForm;
