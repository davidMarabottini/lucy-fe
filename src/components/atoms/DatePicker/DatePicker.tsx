import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {it} from "date-fns/locale/it";
import styles from "./DatePicker.module.scss";
import clsx from "clsx";
import { Calendar } from "lucide-react";
import { useId } from "react";

registerLocale("it", it);

export interface DatePickerProps {
  label?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  //TODO: definire meglio il tipo di onChange in base a selectsRange
  onChange: (date: any, event?: React.SyntheticEvent<any> | undefined) => void;
  // onChange: (dates: [Date | null, Date | null] | Date | null) => void;
  selectsRange?: boolean;
  error?: string;
  required?: boolean;
  className?: string;
}

const DatePicker = ({
  label,
  startDate,
  endDate,
  onChange,
  selectsRange = false,
  error,
  required,
  className,
}: DatePickerProps) => {
  const generatedId = useId();
  const hasValue = !!startDate;

  return (
    <div className={clsx(styles["c-datepicker"], className)}>
      <div className={clsx(
        styles["c-datepicker__wrapper"],
        {
          [styles["c-datepicker__wrapper--error"]]: !!error,
          [styles["c-datepicker__wrapper--has-value"]]: hasValue,
        }
      )}>
        <ReactDatePicker
          locale="it"
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={onChange}
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          selectsRange={selectsRange}
          placeholderText=" "
          className={styles["c-datepicker__input"]}
          id={generatedId}
          autoComplete="off"
        />
        {label && (
          <label htmlFor={generatedId} className={styles["c-datepicker__label"]}>
            {label} {required && "*"}
          </label>
        )}
        <Calendar className={styles["c-datepicker__icon"]} size={18} />
      </div>

      {error && <span className={styles["c-datepicker__error"]}>{error}</span>}
    </div>
  );
};

export default DatePicker;