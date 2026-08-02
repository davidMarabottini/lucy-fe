import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import { useInsertSector, useSectorDetail, useUpdateSector } from '@/hooks/api/useSectors';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { type SectorPayload } from '@/api/types';
import Switch from '@/components/atoms/Switch/Switch';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const InsertSector = () => {
  const { idSector: sectorIdParams } = useParams<{ idSector?: string }>();
  const sectorId = sectorIdParams ? parseInt(sectorIdParams, 10) : undefined;
  const isEditMode = Boolean(sectorId);

  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const { t } = useTranslation('sector', { keyPrefix: 'insert' });

  const { data: sectorData, isFetched: isFetchedSector } = useSectorDetail(sectorId ?? 0, { enabled: isEditMode });
  const { mutate: insertSector, error } = useInsertSector(locNavigate);
  const { mutate: editSector, error: editError } = useUpdateSector(sectorId);

  const onSubmit = (payload: SectorPayload, methods: UseFormReturn<SectorPayload>) => {
    const { dirtyFields } = methods.formState;

    if (isEditMode) {
      const modifiedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = payload[key as keyof SectorPayload];
        return acc;
      }, {} as Partial<SectorPayload>);

      editSector(modifiedData);
      return;
    }

    insertSector(payload);
    methods.reset();
  };

  const init: SectorPayload = !isEditMode ? {
    name: '',
    description: '',
  } : {
    name: sectorData?.name ?? '',
    description: sectorData?.description ?? '',
  };

  const btnClass = clsx(styles['p-insert-sector__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div className={styles['p-insert-sector']}>
      <Card additionalClassName={styles["p-insert-sector__card-title"]}>
        <div className={styles["p-insert-sector__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-insert-sector__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.SECTORS}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {(!isEditMode || isFetchedSector) && <Card additionalClassName={clsx(styles['p-insert-sector'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-insert-sector__container"]}>
          {(error || editError) && <Typography color="error">{t("form.error.generic")}</Typography>}
          
          <Form<SectorPayload>
            defaultValues={init}
            onSubmit={onSubmit}
          >
            <Stack spacing='md'>
              <div className="l-grid">
                <Form.Input
                  className="l-grid__col l-grid__col--span-12"
                  name="name"
                  label={t('form.name.label')}
                  rules={{ required: t('form.name.error.required') }}
                />
                
                <Form.Input
                  className="l-grid__col l-grid__col--span-12"
                  name="description"
                  label={t('form.description.label')}
                  rules={{ required: t('form.description.error.required') }}
                />

                <div className="l-grid__col l-grid__col--span-12 l-grid l-grid--inner">
                  <Form.Button
                    additionalClassName={btnClass}
                    type="submit"
                    autoDisabled={false}
                  >
                    <Check size={16} /> {t("form.submit")}
                  </Form.Button>
                  
                  <Form.Button
                    additionalClassName={btnClass}
                    type="reset"
                    color='secondary'
                    autoDisabled={false}
                  >
                    <X size={16} /> {t("form.reset")}
                  </Form.Button>
                </div>
              </div>
            </Stack>
          </Form>
          {!isEditMode && <Switch
            onChange={res => setLockNavigate(!!res)}
            value={locNavigate}
            label={t('keepInPage')}
            additionalClassName={styles['p-insert-sector__keep-in-page']}
          />}
        </div>
      </Card>}
    </div>
  );
};

export default InsertSector;