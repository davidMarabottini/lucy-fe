import { useMemo } from "react";
import Card from "@components/atoms/Card/Card";
import Stack from "@components/atoms/Stack/Stack";
import Form from "@/components/organisms/form/Form";
import Table from "@/components/organisms/Table/Table";
import Button from "@/components/atoms/Button/Button";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import { Check, Plus, Trash2, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { type ArrayPath, type Control, useFieldArray, useFormContext } from "react-hook-form";
import styles from "../SetDetails.module.scss";

// ----------------------------------------------------------------------
// MOCK DATA
// ----------------------------------------------------------------------
const MOCK_WEEK_DAYS = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

const MOCK_SCHEDULE_TYPES = [
  { id: 1, name: "Orario Fisso", description: "Orario fisso con fasce settimanali", period: "FIXED", icon_name: "CalendarCheck" },
  { id: 2, name: "Flessibile Settimanale", description: "Monte ore settimanale", period: "WEEK", icon_name: "Clock" },
  { id: 3, name: "Flessibile Mensile", description: "Monte ore mensile", period: "MONTH", icon_name: "CalendarDays" },
  { id: 4, name: "Flessibile Giornaliero", description: "Ore target giornaliere", period: "DAY", icon_name: "Sun" },
  { id: 5, name: "Nessun Vincolo", description: "Prestazione libera", period: "NONE", icon_name: "Coffee" },
];

const MOCK_CONTRACT_SCHEDULES = {
  contract_id: 101,
  schedule_type_id: 1,
  hours: "",
  frequency: "1",
  note: "Orario principale di sede",
  schedules: [
    { week_day_id: 1, day_name: "Monday", start_time: "09:00", end_time: "13:00" },
    { week_day_id: 1, day_name: "Monday", start_time: "14:00", end_time: "18:00" },
    { week_day_id: 2, day_name: "Tuesday", start_time: "09:00", end_time: "17:00" },
  ],
  additional_hours: [
    {
      schedule_type_id: "2",
      hours: "10",
      frequency: "1",
      note: "Ore flessibili settimanali aggiuntive",
    },
    {
      schedule_type_id: "3",
      hours: "40",
      frequency: "1",
      note: "Monte ore mensile extra",
    },
  ],
};

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------
type ScheduleSlot = {
  start_time: string;
  end_time: string;
};

type AdditionalHourSlot = {
  schedule_type_id: string;
  hours: string;
  frequency: string;
  note: string;
};

type WorkScheduleFormValues = {
  schedule_type_id: string;
  hours: string;
  frequency: string;
  note: string;
  schedules: Record<string, ScheduleSlot[]>;
  additional_hours: AdditionalHourSlot[];
};

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------
const DayScheduleRows = ({ dayName }: { dayName: string }) => {
  const { control } = useFormContext<WorkScheduleFormValues>();
  const fieldArrayName = `schedules.${dayName.toLowerCase()}` as ArrayPath<WorkScheduleFormValues>;

  const { fields, remove } = useFieldArray({ control, name: fieldArrayName });

  return (
    <Stack spacing="sm">
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Form.Input name={`${fieldArrayName}.${index}.start_time`} type="time" />
          <span>-</span>
          <Form.Input name={`${fieldArrayName}.${index}.end_time`} type="time" />
          {fields.length > 1 && (
            <Button type="button" variant="tertiary" color="danger" size="sm" onClick={() => remove(index)}>
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      ))}
    </Stack>
  );
};

const DayActionCell = ({ dayName, control }: { dayName: string; control: Control<WorkScheduleFormValues> }) => {
  const { append } = useFieldArray({
    control,
    name: `schedules.${dayName.toLowerCase()}` as ArrayPath<WorkScheduleFormValues>,
  });

  return (
    <Button type="button" color="custom" onClick={() => append({ start_time: "", end_time: "" })}>
      <Plus size={14} />
    </Button>
  );
};

// TABELLA ORE AGGIUNTIVE (Settimanali, Mensili, ecc.)
const AdditionalHoursTable = () => {
  const { control } = useFormContext<WorkScheduleFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additional_hours",
  });

  // Tipi selezionabili per gli orari aggiuntivi (escludiamo FIXED e NONE)
  const hourTypeOptions = MOCK_SCHEDULE_TYPES.filter((st) => !["FIXED", "NONE"].includes(st.period)).map((st) => ({
    label: `${st.name} (${st.period})`,
    value: String(st.id),
  }));

  return (
    <Stack spacing="sm">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Monte Ore Aggiuntivi (Settimanali / Mensili / Giornalieri)</h4>
        <Button
          type="button"
          onClick={() =>
            append({
              schedule_type_id: hourTypeOptions[0]?.value ?? "2",
              hours: "",
              frequency: "1",
              note: "",
            })
          }
        >
          <Plus size={14} /> Aggiungi Monte Ore Extra
        </Button>
      </div>

      {fields.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#666", fontSize: "14px" }}>
          Nessun monte ore aggiuntivo configurato.
        </p>
      ) : (
        <Table
          data={fields}
          getRowKey={(row) => row.id}
          columns={[
            {
              key: "__schedule_type_id",
              header: "Tipo Periodo",
              value: (_, index) => (
                <Form.Select
                  name={`additional_hours.${index}.schedule_type_id`}
                  options={hourTypeOptions}
                />
              ),
            },
            {
              key: "hours",
              header: "Totale Ore",
              value: (_, index) => (
                <Form.Input
                  name={`additional_hours.${index}.hours`}
                  type="number"
                  placeholder="Es. 10"
                />
              ),
            },
            {
              key: "frequency",
              header: "Frequenza Periodo",
              value: (_, index) => (
                <Form.Input
                  name={`additional_hours.${index}.frequency`}
                  type="number"
                  placeholder="Es. 1 (ogni periodo)"
                />
              ),
            },
            {
              key: "note",
              header: "Note",
              value: (_, index) => 
                <Form.Input
                  name={`additional_hours.${index}.note`}
                  placeholder="Es. Ore reperibilità"
                />,
            },
          ]}
          actions={(_, index) => [
            <Button
              key="delete"
              type="button"
              variant="tertiary"
              color="danger"
              size="sm"
              onClick={() => remove(index)}
            >
              <Trash2 size={14} />
            </Button>,
          ]}
        />
      )}
    </Stack>
  );
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
const CardForm = ({ contractId }: { contractId: string }) => {
  const { t } = useTranslation("features/contract", { keyPrefix: "details" });
  const { classBase, ...iconPresetRest } = ICON_PRESET;

  const initialValues = useMemo<WorkScheduleFormValues>(() => {
    const data = MOCK_CONTRACT_SCHEDULES;
    const schedulesMap: Record<string, ScheduleSlot[]> = {};

    if (data.schedules) {
      data.schedules.forEach((s) => {
        const day = s.day_name.toLowerCase();
        if (!schedulesMap[day]) schedulesMap[day] = [];
        schedulesMap[day].push({ start_time: s.start_time, end_time: s.end_time });
      });
    }

    MOCK_WEEK_DAYS.forEach((wd) => {
      const day = wd.name.toLowerCase();
      if (!schedulesMap[day] || schedulesMap[day].length === 0) {
        schedulesMap[day] = [{ start_time: "", end_time: "" }];
      }
    });

    return {
      schedule_type_id: String(data.schedule_type_id),
      hours: data.hours ?? "",
      frequency: data.frequency ?? "1",
      note: data.note ?? "",
      schedules: schedulesMap,
      additional_hours: (data.additional_hours || []).map((ah) => ({
        schedule_type_id: String(ah.schedule_type_id),
        hours: String(ah.hours),
        frequency: String(ah.frequency),
        note: ah.note ?? "",
      })),
    };
  }, []);

  return (
    <Card additionalClassName={styles["p-contract-detail__card"]}>
      <Form<WorkScheduleFormValues>
        enableReinitialize
        defaultValues={initialValues}
        onSubmit={(values) => {
          const currentType = MOCK_SCHEDULE_TYPES.find((st) => String(st.id) === String(values.schedule_type_id));
          const isFixed = currentType?.period === "FIXED";

          const payload = {
            contract_id: Number(contractId),
            // Configurazione principale
            main_schedule: {
              schedule_type_id: Number(values.schedule_type_id),
              note: values.note || undefined,
              ...(isFixed
                ? {
                    schedules: Object.entries(values.schedules ?? {}).flatMap(([day, slots]) =>
                      slots
                        .filter(({ start_time, end_time }) => start_time && end_time)
                        .map(({ start_time, end_time }) => {
                          const dayObj = MOCK_WEEK_DAYS.find((w) => w.name.toLowerCase() === day);
                          return {
                            week_day_id: dayObj?.id,
                            day_name: dayObj?.name,
                            start_time,
                            end_time,
                          };
                        })
                    ),
                  }
                : {
                    hours: values.hours ? Number(values.hours) : undefined,
                    frequency: values.frequency ? Number(values.frequency) : 1,
                  }),
            },
            // Monte ore aggiuntivi (Settimanali, Mensili, ecc.)
            additional_hours: values.additional_hours
              .filter((ah) => ah.hours)
              .map((ah) => ({
                schedule_type_id: Number(ah.schedule_type_id),
                hours: Number(ah.hours),
                frequency: ah.frequency ? Number(ah.frequency) : 1,
                note: ah.note || undefined,
              })),
          };

          console.log("Payload generato:", payload);
          alert("Payload generato! Controlla la console.");
        }}
      >
        {({ watch, control }) => {
          const selectedTypeId = watch("schedule_type_id");
          const workType = MOCK_SCHEDULE_TYPES.find((st) => String(st.id) === String(selectedTypeId)) ?? null;

          const period = workType?.period;
          const isFixed = period === "FIXED";
          const requiresHours = period && !["NONE", "FIXED"].includes(period);

          return (
            <Stack spacing="lg">
              {/* ORARIO BASE PRINCIPALE */}
              <div className="l-grid">
                <Form.RadioBtn
                  name="schedule_type_id"
                  label={t("form.type.label", { defaultValue: "Orario Principale" })}
                  className={clsx(classBase, "l-grid__col l-grid__col--span-12")}
                  gap="lg"
                  options={MOCK_SCHEDULE_TYPES.map((st) => {
                    const DynamicIcon =
                      (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[st.icon_name] ??
                      LucideIcons.HelpCircle;
                    return { label: st.description ?? st.name, value: String(st.id), Icon: DynamicIcon };
                  })}
                  {...iconPresetRest}
                />

                {requiresHours && (
                  <>
                    <Form.Input
                      className="l-grid__col l-grid__col--span-6"
                      name="hours"
                      type="number"
                      label={`Ore Principali (${period})`}
                    />
                    <Form.Input
                      className="l-grid__col l-grid__col--span-6"
                      name="frequency"
                      type="number"
                      label={`Ogni quanti ${period?.toLowerCase()}`}
                    />
                  </>
                )}

                <Form.TextArea
                  className="l-grid__col l-grid__col--span-12"
                  name="note"
                  label={t("form.note.label", { defaultValue: "Note orario principale" })}
                  rows={2}
                />
              </div>

              {/* TABELLA FASCE ORARIE (Solo se FIXED) */}
              {isFixed && (
                <Table
                  data={MOCK_WEEK_DAYS}
                  columns={[
                    {
                      key: "name",
                      header: t("form.day.label", { defaultValue: "Giorno" }),
                      value: (row) => row.name,
                    },
                    {
                      key: "__schedules",
                      header: "Fasce Orarie Principali",
                      value: ({ name }) => <DayScheduleRows dayName={name} />,
                    },
                  ]}
                  actions={(row) => [<DayActionCell key={row.id} dayName={row.name} control={control} />]}
                  getRowKey={(row) => String(row.id)}
                />
              )}

              <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "8px 0" }} />

              {/* TABELLA MONTE ORE AGGIUNTIVI */}
              <AdditionalHoursTable />

              {/* PULSANTI DI AZIONE */}
              <div className={styles["p-contract-detail__contract-form-btns-row"]}>
                <Form.Button type="reset" color="secondary" autoDisabled={false}>
                  <X size={16} /> {t("form.reset", { defaultValue: "Annulla" })}
                </Form.Button>
                <Form.Button type="submit">
                  <Check size={16} /> {t("form.save", { defaultValue: "Salva" })}
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
