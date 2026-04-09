import Typography from '@/components/atoms/Typography/Typography';
import styles from './BadgeContainer.module.scss';

const BadgeContainer = ({badgeName}: {badgeName: string}) => {
  return (
     <div className={styles['c-badge-container']}>
        <div className={styles['c-badge-container__image']}></div>
        <Typography as="p" additionalClasses={styles['c-badge-container__text']}>{badgeName}</Typography>
      </div>
  )
}

export default BadgeContainer;