import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {it} from "date-fns/locale/it";
import styles from "./DatePicker.module.scss";
import clsx from "clsx";
import { Calendar } from "lucide-react";
import { useId, type ComponentProps } from "react";

registerLocale("it", it);
export type ReactDatePickerProps = ComponentProps<typeof ReactDatePicker>;

export interface DatePickerProps
  extends Omit<
    ReactDatePickerProps,
    "className" | "selectsRange"
  > {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  selectsRange?: boolean;
}

const DatePicker = ({className, error, label, required, ...props}: DatePickerProps) => {
  const generatedId = useId();
  const hasValue = !!props.selected;

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
          className={styles["c-datepicker__input"]}
          id={generatedId}
          autoComplete="off"
          required={required}
          {...props}
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