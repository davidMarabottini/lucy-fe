import Card from "@/components/atoms/Card/Card";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { useClientDetailStore } from "@/zustand/clientDetailState";
import DateNavigatorCard from "@/components/molecules/DateFilterCard/DateNavigatorCard";

const DateFilterCard = () => {
  const { t } = useTranslation("client", { keyPrefix: "details.workDetails" });
  const setSelectedDate = useClientDetailStore((s) => s.setSelectedDate);
  const setNextDay = useClientDetailStore((s) => s.setNextDay);
  const setPreviousDay = useClientDetailStore((s) => s.setPreviousDay);
  const selectedDate = useClientDetailStore((s) => s.selectedDate);

    const handleChange = (date: Date | null) => {
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      setSelectedDate(`${y}-${m}-${d}`);
    }
  };

  return (
    <Card additionalClassName={styles["p-client-detail__card"]}>
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

export default DateFilterCard;
