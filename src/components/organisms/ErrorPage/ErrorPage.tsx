import Card from '@components/ui/Card/Card';
import Typography from '@/components/ui/Typography/Typography';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import { ROUTES } from '@/constants/routes';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorPage.module.scss';

type ErrorPageProps = {
  code: 404 | 500;
};

const ErrorPage = ({ code }: ErrorPageProps) => {
  const { t } = useTranslation('features/errors');

  return (
    <div className={styles['p-error-page']}>
      <Card additionalClassName={styles['p-error-page__card']}>
        <Typography variant="h1" color="primary" additionalClasses={styles['p-error-page__code']}>
          {code}
        </Typography>
        <Typography variant="h2">{t(`${code}.title`)}</Typography>
        <Typography color="muted">{t(`${code}.description`)}</Typography>
      </Card>
    </div>
  );
};

export default ErrorPage;
