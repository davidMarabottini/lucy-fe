import { Check, type LucideIcon } from 'lucide-react';
import Typography from '../../Typography/Typography';
import styles from './presets.module.scss';
import clsx from 'clsx';
import type { RadioOptionBase } from '../RadioBtn.types';

export interface OptionIcon extends RadioOptionBase {Icon: LucideIcon}

export const ICON_PRESET = {
  variant: 'ghost',

  classBase: styles['pr-icon__radiogroup'],

  children: ({Icon, label}: OptionIcon, isSelected: boolean) => 
    <Typography as="div" variant="small" additionalClasses={clsx(
        styles['pr-icon__radio-wrapper'],
        {[styles['pr-icon__radio-wrapper--selected']]: isSelected}
      )}>
      <div className={styles['pr-icon__radio-icon-wrapper']}>
        {isSelected && <Check size={12}/>}
        <Icon size={20} />
      </div>

      <div>{label}</div>
    </Typography>
} as const;
