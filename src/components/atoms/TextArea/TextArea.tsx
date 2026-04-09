import type { TextAreaProps } from "./TextArea.types";
import styles from "./TextArea.module.scss";
import clsx from "clsx";
import { forwardRef, useId } from "react";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, onChange, onValueChange, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onValueChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={clsx(styles['c-text-area'], className, { 
        [styles['c-text-area--error']]: !!error,
      })}>
        <div className={styles['c-text-area__wrapper']}>
          {label && <label htmlFor={inputId} className={clsx(styles['c-text-area__label'])}>{label}</label>}
          <textarea
            ref={ref}
            id={inputId}
            className={clsx(styles['c-text-area__field'])}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
        </div>
        {error && <span id={errorId} className={styles['c-text-area__error-msg']} aria-live="polite">{error}</span>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea"
export default TextArea;
