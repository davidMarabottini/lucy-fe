import Card from "@/components/atoms/Card/Card";
import DatePicker from "@/components/atoms/DatePicker/DatePicker";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { useClientDetailStore } from "@/zustand/clientDetailState";
import Button from "@/components/atoms/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DateFilterCard = () => {
  const { t } = useTranslation("client", { keyPrefix: "details.workDetails" });
  const setSelectedDate = useClientDetailStore((s) => s.setSelectedDate);
  const setNextDay = useClientDetailStore((s) => s.setNextDay);
  const setPreviousDay = useClientDetailStore((s) => s.setPreviousDay);
  const selectedDate = useClientDetailStore((s) => s.selectedDate);

  const handleChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
    }
  };

  const endDate = new Date();
  const selectedDateObj = new Date(selectedDate);
  const isToday = selectedDateObj.toDateString() === endDate.toDateString();

  return (
    <Card additionalClassName={styles["p-client-detail__card"]}>
      <div style={{ display: 'flex', gap: '32px' }}>
        <Button onClick={setPreviousDay}><ChevronLeft /></Button>
        <DatePicker
          maxDate={endDate}
          selected={new Date(selectedDateObj)}
          label={t("select_date")}
          onChange={handleChange}
          endDate={endDate}
        />
        <Button onClick={setNextDay} disabled={isToday}><ChevronRight /></Button>
      </div>
    </Card>
  );
};

export default DateFilterCard;
