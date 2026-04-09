import { forwardRef, useEffect, useRef } from 'react';
import styles from './Switch.module.scss';
import type { SwitchProps } from './Switch.types';
import clsx from 'clsx';
import { BadgeQuestionMark, Check, X } from 'lucide-react';

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    label,
    value=null,
    onChange,
    allowIndeterminate,
    additionalClassName,
    OKIcon=Check,
    KOIcon=X,
    IndeterminatedIcon=BadgeQuestionMark,
    dataTestid,
    ...props
  }, externalRef) => {
    const realValue = allowIndeterminate ? value : !!value

    const ref = useRef<HTMLInputElement>(null);

    const setRefs = (node: HTMLInputElement | null) => {
      ref.current = node;

      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef) {
        externalRef.current = node;
      }
    };

    const isChecked = realValue === true
    const isIndeterminate = realValue === null
    const isUnchecked = realValue === false

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = allowIndeterminate ? isIndeterminate : false;
      }
    }, [realValue, allowIndeterminate, isIndeterminate]);

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
            [styles['c-switch--indeterminate']]: isIndeterminate
          }, additionalClassName)
        }
        data-testid={dataTestid}
        >
          <input
            type="checkbox"
            ref={setRefs}
            checked={isChecked}
            onChange={handleChange}
            className={styles['c-switch__checkbox']}
            role="switch"
            aria-checked={isIndeterminate ? 'mixed' : isChecked}
            {...props}
          />

          <span className={styles['c-switch__trackback']}>
            <div className={styles['c-switch__point']}>
              {isChecked && <OKIcon size={20} />}
              {isIndeterminate && <IndeterminatedIcon size={20} />}
              {isUnchecked && <KOIcon size={20} />}
            </div>
          </span>

          <span className={styles['c-switch__box']} />
            {label}
          </label>
      );
  }
);

export default Switch
