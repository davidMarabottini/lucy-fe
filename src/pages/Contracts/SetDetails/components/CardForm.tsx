import Card from "@components/atoms/Card/Card";
import { Check, Plus, Trash2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { WeekDay } from "@/api/types";
import { useContractSchedules, useSyncWorkSchedules } from "@/hooks/api/useWorkScheduleHooks";
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
import { useFieldArray, useFormContext, type ArrayPath } from "react-hook-form";
import Button from "@/components/atoms/Button/Button";

type ScheduleSlot = {
  start_time: string;
  end_time: string;
};

type WorkScheduleFormValues = {
  schedule_type_id: string;
  weekly_hours: string;
  note: string;
  schedules: Record<string, ScheduleSlot[]>;
};

const DayScheduleRows = ({ dayName }: { dayName: string }) => {
  const { control } = useFormContext<WorkScheduleFormValues>();
  const fieldArrayName = `schedules.${dayName.toLowerCase()}` as const;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName as ArrayPath<WorkScheduleFormValues>,
  });

  return (
    <Stack spacing="sm">
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Form.Input
            name={`${fieldArrayName}.${index}.start_time`}
            type="time"
          />
          <span>-</span>
          <Form.Input
            name={`${fieldArrayName}.${index}.end_time`}
            type="time"
          />
          {fields.length > 1 && (
            <Button
              type="button"
              color="custom"
              onClick={() => remove(index)}
              title="Rimuovi fascia oraria"
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      ))}
      <div>
        <Button
          type="button"
          color="custom"
          onClick={() => append({ start_time: "", end_time: "" })}
        >
          <Plus size={14} />
        </Button>
      </div>
    </Stack>
  );
};

const CardForm = ({ contractId }: { contractId: string }) => {
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });
  const { classBase, ...iconPresetRest } = ICON_PRESET;
  const { data: scheduleTypes, isLoading: isLoadingTypes } = useWorkScheduleTypes();
  const { data: weekDays, isLoading: isLoadingDays } = useWeekDays();
  const { data: contractSchedules, isLoading: isLoadingSchedules } = useContractSchedules({ contract_id: Number(contractId) });
  const { mutate: syncWorkSchedules } = useSyncWorkSchedules(Number(contractId));

  const isLoading = isLoadingTypes || isLoadingDays || isLoadingSchedules;

  const initialValues = useMemo<WorkScheduleFormValues>(() => {
    if (!contractSchedules || !weekDays) {
      return {
        schedule_type_id: "",
        weekly_hours: "",
        note: "",
        schedules: {},
      };
    }

    const schedulesMap: Record<string, ScheduleSlot[]> = {};

    contractSchedules.forEach((s) => {
      if (s.week_day?.name) {
        const day = s.week_day.name.toLowerCase();
        if (!schedulesMap[day]) {
          schedulesMap[day] = [];
        }
        schedulesMap[day].push({
          start_time: s.start_time ?? "",
          end_time: s.end_time ?? "",
        });
      }
    });

    weekDays.forEach((wd) => {
      const day = wd.name.toLowerCase();
      if (!schedulesMap[day] || schedulesMap[day].length === 0) {
        schedulesMap[day] = [{ start_time: "", end_time: "" }];
      }
    });

    return {
      schedule_type_id: contractSchedules[0]?.schedule_type_id
        ? String(contractSchedules[0].schedule_type_id)
        : "",
      weekly_hours: contractSchedules[0]?.weekly_hours
        ? String(contractSchedules[0].weekly_hours)
        : "",
      note: contractSchedules[0]?.note ?? "",
      schedules: schedulesMap,
    };
  }, [contractSchedules, weekDays]);
  return isLoading ? (
        <div>Caricamento in corso...</div>
  ) : (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Form<WorkScheduleFormValues>
        // enableReinitialize
        defaultValues={initialValues}
        onSubmit={(values) => {
          const flatSchedules = Object.entries(values.schedules ?? {}).flatMap(
            ([day, slots]) =>
              slots
                .filter(({ start_time, end_time }) => start_time && end_time)
                .map(({ start_time, end_time }) => ({
                  day,
                  startTime: start_time,
                  endTime: end_time,
                }))
          );

          syncWorkSchedules({
            contract_id: Number(contractId),
            schedule_type_id: Number(values.schedule_type_id),
            weekly_hours: values.weekly_hours ? Number(values.weekly_hours) : undefined,
            note: values.note || undefined,
            schedules: flatSchedules,
          });
        }}
      >
        {({ watch }) => {
          const selectedTypeId = watch("schedule_type_id");
          const workType = scheduleTypes?.find((st) => String(st.id) === String(selectedTypeId)) ?? null;

          return (
            <Stack spacing="md">
              <div className="l-grid">
                <Form.RadioBtn
                  name="schedule_type_id"
                  label={t("form.type.label")}
                  className={clsx(classBase, "l-grid__col l-grid__col--span-12")}
                  gap="lg"
                  options={
                    scheduleTypes?.map((st) => {
                      const DynamicIcon =
                        (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[st.icon_name] ??
                        LucideIcons.HelpCircle;
                      return { label: st.description ?? "", value: String(st.id), Icon: DynamicIcon };
                    }) ?? []
                  }
                  {...iconPresetRest}
                />

                {workType && !["NONE", "FIXED"].includes(workType.period) && (
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
                      key: "name",
                      header: t("form.day.label"),
                      value: (row) => row.name ?? "-",
                    },
                    {
                      key: "__schedules",
                      header: t("form.start.label") + " / " + t("form.end.label"),
                      value: ({ name }) => <DayScheduleRows dayName={name} />,
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

export default CardForm;
