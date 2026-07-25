import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInsertWorkSchedule } from "@/hooks/api/useWorkScheduleHooks";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import { useWeekDays } from "@/hooks/api/WeekDaysHooks";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import Form from "@/components/organisms/form/Form";
import Stack from "@/components/atoms/Stack/Stack";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import type { WorkScheduleAdd } from "@/api/types";

type ModalFormScheduleProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  contractId: string;
};

type WorkScheduleFormValues = {
  schedule_type_id: string;
  week_day_id: string;
  weekly_hours: string;
  start_time: string;
  end_time: string;
  note: string;
};

const ModalFormSchedule = ({ openModal, setOpenModal, contractId }: ModalFormScheduleProps) => {
  const { t } = useTranslation("contract", { keyPrefix: "details" });
  const { data: scheduleTypes } = useWorkScheduleTypes();
  const { data: weekDays } = useWeekDays();
  const { mutate: insertSchedule } = useInsertWorkSchedule();

  const onSubmit = (data: WorkScheduleFormValues) => {
    const payload: WorkScheduleAdd = {
      contract_id: Number(contractId),
      work_schedule_type_id: Number(data.schedule_type_id),
      week_day_id: data.week_day_id ? Number(data.week_day_id) : null,
      weekly_hours: data.weekly_hours ? Number(data.weekly_hours) : null,
      start_time: data.start_time || null,
      end_time: data.end_time || null,
      note: data.note || null,
    };

    insertSchedule(payload, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        schedule_type_id: "",
        week_day_id: "",
        weekly_hours: "",
        start_time: "",
        end_time: "",
        note: "",
      }}
    >
      {({ reset }) => (
        <Modal
          header={t("form.title")}
          open={openModal}
          setOpen={setOpenModal}
          btnList={[
            <Button key="reset" type="button" color="secondary" onClick={() => reset()}>
              <X size={16} /> {t("form.reset")}
            </Button>,
            <Button key="submit" type="submit">
              <Check size={16} /> {t("form.save")}
            </Button>,
          ]}
        >
          <Stack>
            <Form.RadioBtn
              name="schedule_type_id"
              label={t("form.type.label")}
              options={scheduleTypes?.map((t) => ({
                label: t.name,
                value: String(t.id),
                iconName: t.icon_name || "Clock",
              })) ?? []}
              preset={ICON_PRESET}
            />

            <Form name="schedule_type_id" match={(val) => val === "1"}>
              {(isMatched) =>
                isMatched ? (
                  <Form.Input
                    className="l-grid__col l-grid__col--span-12"
                    name="weekly_hours"
                    type="number"
                    label={t("form.weekly_hours.label")}
                  />
                ) : (
                  <div className="l-grid">
                    <Form.Select
                      className="l-grid__col l-grid__col--span-4"
                      name="week_day_id"
                      label={t("form.day.label")}
                      options={weekDays?.map((d) => ({ label: d.name, value: String(d.id), Icon: "" })) ?? []}
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
                  </div>
                )
              }
            </Form>

            <Form.TextArea
              className="l-grid__col l-grid__col--span-12"
              name="note"
              label={t("form.note.label")}
              rows={2}
            />
          </Stack>
        </Modal>
      )}
    </Form>
  );
};

export default ModalFormSchedule;