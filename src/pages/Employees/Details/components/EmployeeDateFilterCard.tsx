import Card from "@/components/atoms/Card/Card";
import DatePicker from "@/components/atoms/DatePicker/DatePicker";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { useEmployeeDetailStore } from "@/zustand/employeeDetailState";
import Button from "@/components/atoms/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const endDate = new Date();
  const todayYMD = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
  const selectedDateObj = new Date(`${selectedDate}T00:00:00`);
  const isToday = selectedDate === todayYMD;

  return (
    <Card additionalClassName={styles["p-employee-detail__card"]}>
      <div style={{ display: 'flex', gap: '32px' }}>
        <Button onClick={setPreviousDay}><ChevronLeft /></Button>
        <DatePicker
          maxDate={endDate}
          selected={selectedDateObj}
          label={t("select_date")}
          onChange={handleChange}
          endDate={endDate}
        />
        <Button onClick={setNextDay} disabled={isToday}><ChevronRight /></Button>
      </div>
    </Card>
  );
};

export default EmployeeDateFilterCard;
