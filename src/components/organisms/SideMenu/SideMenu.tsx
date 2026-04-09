import * as Dialog from '@radix-ui/react-dialog';
// import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { useTranslation } from 'react-i18next';
import { useMenuStore } from '@/zustand/menuState';
import MenuManager from '@/components/molecules/MenuManager/MenuManager';

export const SideMenu = () => {
  const { t } = useTranslation('common');
  const { menuOpen, closeMenu } = useMenuStore();

  return (
    <Dialog.Root open={menuOpen} onOpenChange={(open) => !open && closeMenu()}>
      <Dialog.Portal>

        <Dialog.Content className={styles['c-side-menu']} asChild>
          <nav>
          <div className={styles['c-side-menu__header']}>
            <Dialog.Title asChild>
              <Typography variant="h3" color="primary">
                {t('sideMenu.title')}
              </Typography>
            </Dialog.Title>
          </div>

          <MenuManager
            curMenu="main"
            additionalClass={styles['c-side-menu__list']}
            itemClickHandler={closeMenu}
          />
          </nav>
        </Dialog.Content>
        <Dialog.Overlay className={styles['c-side-menu__backdrop']} />
      </Dialog.Portal>
    </Dialog.Root>
  );
};
