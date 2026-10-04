import type { InputProps } from "./Input.types";
import styles from "./Input.module.scss";
import clsx from "clsx";
import { forwardRef, useId } from "react";
import { setRequiredField } from "@/utils/string";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, onChange, onValueChange, id, className, fieldClassName, value, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={clsx(styles['c-input'], { 
        [styles['c-input--error']]: !!error,
      }, className)}>
        <div className={styles['c-input__wrapper']}>
          <input
            ref={ref}
            id={inputId}
            value={value}
            className={clsx(styles['c-input__field'], fieldClassName)}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={clsx(styles['c-input__label'])}
            >
              {setRequiredField(label, required)}
            </label>
          )}
        </div>
        {error && <span id={errorId} className={styles['c-input__error-msg']} aria-live="polite">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
