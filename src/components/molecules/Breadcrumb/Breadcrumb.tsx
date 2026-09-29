import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, HomeIcon } from 'lucide-react';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { useAuth } from '@/auth/useAuth';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import styles from './Breadcrumb.module.scss';

export const Breadcrumb = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation('menu');
  const items = useBreadcrumb();

  if (!isAuthenticated || items.length === 0) return null;

  return (
    <nav className={styles['c-breadcrumb']} aria-label="breadcrumb">
      <ol className={styles['c-breadcrumb__list']}>
        {items.map((item, index) => (
          <Fragment key={item.key}>
            <li className={styles['c-breadcrumb__item']}>
              {item.isCurrent ? (
                <span className={styles['c-breadcrumb__current']} aria-current="page">
                  {index === 0 && <HomeIcon size={14} />}
                  {t(item.label)}
                </span>
              ) : (
                <LinkComponent to={item.path} className={styles['c-breadcrumb__link']}>
                  {index === 0 && <HomeIcon size={14} />}
                  {t(item.label)}
                </LinkComponent>
              )}
            </li>
            {index < items.length - 1 && (
              <ChevronRight size={14} className={styles['c-breadcrumb__separator']} aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
