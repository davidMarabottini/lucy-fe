import { forwardRef, useId, useState, type JSX } from "react";
import type { RadioBtnProps, RadioOptionBase } from "./RadioBtn.types";
import styles from './RadioBtn.module.scss';
import clsx from "clsx";
import Typography from "../Typography/Typography";


const RadioBtn = forwardRef(
  <T extends RadioOptionBase>(
    {
      options,
      name,
      label,
      value,
      defaultValue,
      onValueChange: onChange,
      children,
      error,
      className,
      orientation = "horizontal",
      variant = "standard",
      gap,
      disabled,
      ...props
    }: RadioBtnProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [curValue, setCurValue] = useState<string | undefined>(defaultValue);

    const changeHandler = (cv: string, label: string) => {
      setCurValue(cv);
      onChange?.(cv, label);
    }

    const groupId = useId();

    return (
      <div className={clsx(styles['c-radio-btn'], className)} ref={ref} role="radiogroup" {...props}>
        <Typography as="div">{label}</Typography>
        <div className={clsx(styles['c-radio-btn__container'], {
          [styles['c-radio-btn__container--vertical']]: orientation === "vertical",
          [styles[`c-radio-btn__container--${gap}`]]: gap,
        })}>
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`;
            const isSelected = (value !== undefined ? value : curValue) === option.value;

            return (
              <div key={option.value} className={styles['c-radio-btn__item']}>
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => changeHandler(option.value, option.label)}
                  className={clsx(styles['c-radio-btn__item-input'], {[styles['c-radio-btn__item-input--ghost']]: variant === 'ghost'})}
                  disabled={disabled}
                  aria-disabled={`${!!disabled}`}
                />
                <label htmlFor={optionId} className={styles['c-radio--btn__item-label']}>
                  {typeof children === 'function' 
                    ? children(option, isSelected) 
                    : <span>{option.label}</span>
                  }
                </label>
              </div>
            );
          })}
        </div>
        {error && <span className={styles['c-radio-btn__error-msg']}>{error}</span>}
      </div>
    );
  }
) as <T extends RadioOptionBase>(
  props: RadioBtnProps<T> & React.RefAttributes<HTMLDivElement>
) => JSX.Element;

// RadioBtn.displayName = "RadioBtn";
export default RadioBtn;
