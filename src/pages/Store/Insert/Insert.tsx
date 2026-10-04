import Card from '@components/ui/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/form/Form';
import Stack from '@/components/ui/Stack/Stack';
import { useInsertStore, useStoreDetail, useUpdateStore } from '@/hooks/api/useStores';
import Typography from '@/components/ui/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import type { PayloadStore } from '@/api/types';
import Switch from '@/components/ui/Switch/Switch';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGroupCompanies } from '@/hooks/api/GroupCompanyHooks';

const InsertStore = () => {
  const { idStore: storeIdParams } = useParams<{ idStore?: string }>();
  const storeId = storeIdParams ? parseInt(storeIdParams, 10) : undefined;
  const isEditMode = Boolean(storeId);

  const [locNavigate, setLockNavigate] = useState<boolean>(false);
  const { t } = useTranslation("features/store", { keyPrefix: 'insert' });

  const { data: storeData, isFetched: isFetchedStore } = useStoreDetail(storeId ?? 0, { enabled: isEditMode });
  const { mutate: insertStore, error } = useInsertStore(locNavigate);
  const { mutate: editStore, error: editError } = useUpdateStore(storeId);

  const { data: companies } = useGroupCompanies(undefined, true);
  const companyOptions = (companies ?? []).map(c => ({ value: String(c.id), label: c.name }));

  const onSubmit = (rawPayload: PayloadStore, methods: UseFormReturn<PayloadStore>) => {
    const { dirtyFields } = methods.formState;
    // La select restituisce l'id come stringa
    const payload: PayloadStore = { ...rawPayload, company_id: Number(rawPayload.company_id) };

    if (isEditMode) {
      const modifiedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = payload[key as keyof PayloadStore];
        return acc;
      }, {} as Partial<PayloadStore>);

      editStore(modifiedData);
      return;
    }

    insertStore(payload);
    methods.reset();
  };

  const init: PayloadStore = !isEditMode ? {
    company_id: '' as unknown as number,
    name: '',
    description: '',
    price: 0,
  } : {
    company_id: String(storeData?.company_id ?? '') as unknown as number,
    name: storeData?.name ?? '',
    description: storeData?.description ?? '',
    price: storeData?.price ?? 0,
  };

  const btnClass = clsx(styles['p-insert-store__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div className={styles['p-insert-store']}>
      <Card additionalClassName={styles["p-insert-store__card-title"]}>
        <div className={styles["p-insert-store__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-insert-store__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.STORE_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {(!isEditMode || isFetchedStore) && <Card additionalClassName={clsx(styles['p-insert-store'], "l-grid__col l-grid__col--span-12")}>
        <div className={styles["p-insert-store__container"]}>
          {(error || editError) && <Typography color="error">{t("form.error.generic")}</Typography>}
          
          <Form<PayloadStore>
            defaultValues={init}
            onSubmit={onSubmit}
          >
            <Stack spacing='md'>
              <div className="l-grid">
                <Form.Select
                  className="l-grid__col l-grid__col--span-12"
                  name="company_id"
                  label={t('form.company_id.label')}
                  options={companyOptions}
                  rules={{ required: t('form.company_id.error.required') }}
                />

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

                <Form.Input
                  className="l-grid__col l-grid__col--span-12"
                  name="price"
                  label={t('form.price.label')}
                  rules={{ required: t('form.price.error.required') }}
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
            additionalClassName={styles['p-insert-store__keep-in-page']}
          />}
        </div>
      </Card>}
    </div>
  );
};

export default InsertStore;
