import { useMemo } from "react";
import { useFieldArray, useFormContext, type ArrayPath } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Check, Plus, Trash2, X } from "lucide-react";

import type { WeekDay } from "@/api/types";
import { useContractSchedules, useSyncWorkSchedules } from "@/hooks/api/useWorkScheduleHooks";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import { useWeekDays } from "@/hooks/api/WeekDaysHooks";

import Card from "@components/atoms/Card/Card";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import Table from "@/components/organisms/Table/Table";
import Button from "@/components/atoms/Button/Button";

import styles from "../SetDetails.module.scss";
import Tooltip from "@/components/atoms/Tooltip/Tooltip";

type ScheduleSlot = {
  start_time: string;
  end_time: string;
};

type WorkScheduleFormValues = {
  schedule_type_id: string;
  note: string;
  schedules: Record<string, ScheduleSlot[]>;
  flexible: Record<string, number>;
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
  
  const { data: scheduleTypes, isLoading: isLoadingTypes } = useWorkScheduleTypes();
  const { data: weekDays, isLoading: isLoadingDays } = useWeekDays();
  const { data: contractSchedules, isLoading: isLoadingSchedules } = useContractSchedules({ contract_id: Number(contractId) });
  const { mutate: syncWorkSchedules } = useSyncWorkSchedules(Number(contractId));

  const isLoading = isLoadingTypes || isLoadingDays || isLoadingSchedules;

  const initialValues = useMemo<WorkScheduleFormValues>(() => {
  if (!contractSchedules || !weekDays) {
    return {
      schedule_type_id: "",
      note: "",
      schedules: {},
      flexible: {},
    };
  }

  const schedulesMap: Record<string, ScheduleSlot[]> = {};
  const flexibleMap: Record<string, number> = {};

  contractSchedules.forEach((s) => {
    // 1. Inizializzazione orari fissi (giornalieri)
    if (s.schedule_type?.period === "FIXED" && s.week_day?.name) {
      const day = s.week_day.name.toLowerCase();
      
      if (!schedulesMap[day]) {
        schedulesMap[day] = [];
      }
      
      schedulesMap[day].push({
        start_time: s.start_time ?? "",
        end_time: s.end_time ?? "",
      });
    } 
    else if (s.schedule_type?.period !== "FIXED" && s.schedule_type?.name) {
      flexibleMap[s.schedule_type.name] = s.weekly_hours ?? 0;
    }
  });

  // 3. Fallback: Assicura che i giorni senza orari abbiano uno slot vuoto per il form
  weekDays.forEach((wd) => {
    const day = wd?.name?.toLowerCase() ?? "";
    if (!schedulesMap[day] || schedulesMap[day].length === 0) {
      schedulesMap[day] = [{ start_time: "", end_time: "" }];
    }
  });

  return {
    schedule_type_id: contractSchedules[0]?.schedule_type_id ? String(contractSchedules[0].schedule_type_id) : "",
    note: contractSchedules[0]?.note ?? "",
    schedules: schedulesMap,
    flexible: flexibleMap, // <-- Ora i flessibili sono passati correttamente
  };
}, [contractSchedules, weekDays]);

  const { fixed, flexible } = useMemo(() => {
    return scheduleTypes 
      ? Object.groupBy(scheduleTypes, (x) => x.period === "FIXED" ? "fixed" : "flexible") 
      : { fixed: null, flexible: null };
  }, [scheduleTypes]);

  const onSubmit = (values: WorkScheduleFormValues) => {
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
      note: values.note || undefined,
      schedules: flatSchedules,
      flexible: values.flexible,
    });
  };

  if (isLoading) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Form<WorkScheduleFormValues>
        defaultValues={initialValues}
        onSubmit={onSubmit}
      >
        <Stack spacing="md">
          {fixed && weekDays && (
            <Table<WeekDay>
              data={weekDays}
              columns={[
                {
                  key: "name",
                  header: t("form.day.label"),
                  value: (row) => row?.name ?? "-",
                },
                {
                  key: "__schedules",
                  header: `${t("form.start.label")} / ${t("form.end.label")}`,
                  value: ({ name = "" }) => <DayScheduleRows dayName={name} />,
                },
              ]}
              getRowKey={(row) => String(row.id)}
            />
          )}

          {flexible?.map((st) => (
            <div key={st.name}
            // style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {/* <h3>{st.description}</h3> */}
              <Form.Input
                // className="l-grid__col l-grid__col--span-6"
                name={`flexible.${st.name}`}
                type="number"
                label={st.name}
              />
              <Tooltip text={st.description} position="left" />
            </div>
          ))}

          <div className={styles["p-contract-detail__contract-form-btns-row"]}>
            <Form.Button type="reset" color="secondary" autoDisabled={false}>
              <X size={16} /> {t("form.reset")}
            </Form.Button>
            <Form.Button type="submit">
              <Check size={16} /> {t("form.save")}
            </Form.Button>
          </div>
        </Stack>
      </Form>
    </Card>
  );
};

export default CardForm;
