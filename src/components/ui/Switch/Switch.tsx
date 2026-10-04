import { forwardRef } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import styles from './Switch.module.scss';
import type { SwitchProps } from './Switch.types';
import clsx from 'clsx';
import { BadgeQuestionMark, Check, X } from 'lucide-react';

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({
    label,
    value=null,
    onChange,
    allowIndeterminate,
    disabled,
    additionalClassName,
    OKIcon=Check,
    KOIcon=X,
    IndeterminatedIcon=BadgeQuestionMark,
    dataTestid,
    ...props
  }, ref) => {
    const realValue = allowIndeterminate ? value : !!value

    const isChecked = realValue === true
    const isIndeterminate = allowIndeterminate && realValue === null
    const isUnchecked = realValue === false

    // Radix reports its own toggled guess as the callback argument; the real next value follows our tri-state cycle instead
    const handleChange = () => {
      if (!allowIndeterminate) {
        onChange(!realValue);
        return;
      }

      const next = isIndeterminate ? true : realValue ? false : null;

      onChange(next);
    };

      return (
        <label className={
          clsx(styles['c-switch'], {
            [styles['c-switch--checked']]: isChecked,
            [styles['c-switch--indeterminate']]: isIndeterminate,
            [styles['c-switch--disabled']]: disabled,
          }, additionalClassName)
        }
        data-testid={dataTestid}
        >
          <RadixSwitch.Root
            ref={ref}
            checked={isChecked}
            onCheckedChange={handleChange}
            disabled={disabled}
            aria-checked={isIndeterminate ? 'mixed' : isChecked}
            className={styles['c-switch__trackback']}
            {...props}
          >
            <RadixSwitch.Thumb className={styles['c-switch__point']}>
              {isChecked && <OKIcon size={20} />}
              {isIndeterminate && <IndeterminatedIcon size={20} />}
              {isUnchecked && <KOIcon size={20} />}
            </RadixSwitch.Thumb>
          </RadixSwitch.Root>

          {label}
        </label>
      );
  }
);

Switch.displayName = "Switch";
export default Switch
