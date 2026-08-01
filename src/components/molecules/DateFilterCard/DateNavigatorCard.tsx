import DatePicker from "@/components/atoms/DatePicker/DatePicker";
import Button from "@/components/atoms/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DateNavigatorCardProps } from "./DateNavigatorCard.types";

const DateNavigatorCard = ({
  selectedDate,
  onSelectDate,
  onNextDay,
  onPreviousDay,
  label,
  additionalClassName,
}: DateNavigatorCardProps) => {
  const endDate = new Date();
  const todayYMD = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
  const selectedDateObj = new Date(`${selectedDate}T00:00:00`);
  const isToday = selectedDate === todayYMD;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={additionalClassName}>
      <Button onClick={onPreviousDay}><ChevronLeft /></Button>
      <DatePicker
        maxDate={endDate}
        selected={selectedDateObj}
        label={label}
        onChange={onSelectDate}
        endDate={endDate}
      />
      <Button onClick={onNextDay} disabled={isToday}><ChevronRight /></Button>
    </div>
  );
};

export default DateNavigatorCard;