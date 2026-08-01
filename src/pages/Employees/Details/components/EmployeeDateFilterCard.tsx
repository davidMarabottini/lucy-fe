import Card from "@/components/atoms/Card/Card";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { useEmployeeDetailStore } from "@/zustand/employeeDetailState";
import DateNavigatorCard from "@/components/molecules/DateFilterCard/DateNavigatorCard";

const EmployeeDateFilterCard = () => {
  const { t } = useTranslation("employee", { keyPrefix: "details" });
  const setSelectedDate = useEmployeeDetailStore((s) => s.setSelectedDate);
  const setNextDay = useEmployeeDetailStore((s) => s.setNextDay);
  const setPreviousDay = useEmployeeDetailStore((s) => s.setPreviousDay);
  const selectedDate = useEmployeeDetailStore((s) => s.selectedDate);

  const handleChange = (date: Date | null) => {
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      setSelectedDate(`${y}-${m}-${d}`);
    }
  };

  return (
    <Card additionalClassName={styles["p-employee-detail__card"]}>
      <DateNavigatorCard
        label={t("select_date")}
        onNextDay={setNextDay}
        onPreviousDay={setPreviousDay}
        selectedDate={selectedDate}
        onSelectDate={handleChange}
      />
    </Card>
  );
};

export default EmployeeDateFilterCard;
