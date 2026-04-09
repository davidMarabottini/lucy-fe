import type { ReactNode } from 'react';
import styles from './HamSpamTable.module.scss';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';
import Typography from '@/components/atoms/Typography/Typography';

interface HamSpamTableProps {
  children: ReactNode;
  ham: number;
  spam: number;
}

const HamSpamTable = ({children, ham, spam}: HamSpamTableProps) => {
  return (
     <div className={styles['c-ham-spam-table']}>
        <Typography as="div" color="text">{children}</Typography>
        <div className={styles['c-ham-spam-table__row']}>
          <div className={clsx(styles['c-ham-spam-table__cell'], styles['c-ham-spam-table__cell--ham'])}>
            <ShieldCheck size={16} />
            <Typography as="div">
              {ham} Ham
            </Typography>
          </div>

          <div className={clsx(styles['c-ham-spam-table__cell'], styles['c-ham-spam-table__cell--spam'])}>
            <ShieldAlert size={16} />
            <Typography as="div">
              {spam} Spam
            </Typography>
          </div>
        </div>
    </div>
  )
}

export default HamSpamTable;