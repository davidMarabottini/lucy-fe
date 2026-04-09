import { CircularProgressbar } from 'react-circular-progressbar';
import styles from './ResultCircle.module.scss';
import clsx from 'clsx';
import type { ResultCircleProps } from './ResultCircle.types';

const ResultCircle = ({ percentage }: ResultCircleProps) => {
  const isSpam = percentage > 50;

  return (
    <div
      className={clsx(
        styles['c-result-circle'],
        {
          [styles['c-result-circle--spam']]: isSpam,
          [styles['c-result-circle--legit']]: !isSpam
        }
      )}
    >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
      />
    </div>
  );
};

export default ResultCircle;
