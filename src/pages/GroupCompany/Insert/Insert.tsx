import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { useGroupCompanyDetail, useInsertGroupCompany, useUpdateGroupCompany } from '@/hooks/api/GroupCompanyHooks';
import { useSectors } from '@/hooks/api/useSectors';
import { type GroupCompanyPayload } from '@/api/types';
import Switch from '@/components/atoms/Switch/Switch';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const InsertGroupCompany = () => {
  const { idCompany: companyIdParams } = useParams<{ idCompany?: string }>();
  const companyId = companyIdParams ? parseInt(companyIdParams, 10) : undefined;
  const isEditMode = Boolean(companyId);

  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const { t } = useTranslation('groupCompany', { keyPrefix: 'insert' });
  const { data: companyData, isFetched: isFetchedCompany } = useGroupCompanyDetail(companyId ?? 0, { enabled: isEditMode });
  const { mutate: insertCompany } = useInsertGroupCompany(locNavigate);
  const { mutate: editCompany } = useUpdateGroupCompany(companyId);
  const { data: availableSectors } = useSectors();

  const onSubmit = (values: GroupCompanyPayload,  methods: UseFormReturn<GroupCompanyPayload>) => {
    const { dirtyFields } = methods.formState;

    if (isEditMode) {
      const modifiedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = values[key as keyof GroupCompanyPayload];
        return acc;
      }, {} as Partial<GroupCompanyPayload>);

      editCompany(modifiedData);
      return;
    }

    insertCompany(values);
    methods.reset()
  };

  const btnClass = clsx(styles['p-insert-company__button'], "l-grid__col l-grid__col--span-6");

  return (
    <div className={styles['p-insert-company']}>
      {/* Header */}
      <Card additionalClassName={styles["p-insert-company__card-title"]}>
        <div className={styles["p-insert-company__card-title-internal"]}>
          <Typography variant="h2">{t("title")}</Typography>
          <LinkComponent to={ROUTES.GROUP_COMPANIES}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {(!isEditMode || isFetchedCompany) && <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <Form<GroupCompanyPayload>
          onSubmit={onSubmit}
          defaultValues={
            !isEditMode
              ? { name: '', vat_number: '', sector_ids: [] }
              : {
                  name: companyData?.name ?? '',
                  vat_number: companyData?.vat_number ?? '',
                  sector_ids: companyData?.sectors?.map((sector) => sector.id) ?? [],
                }
          }
        >
          <Stack spacing='lg'>
            <div className="l-grid">
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="name"
                label={t('form.name.label')}
                rules={{ required: t('form.name.error.required') }}
              />
              
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="vat_number"
                label={t('form.vat_number.label')}
              />

              <Form.FilteredDualListBox
                className="l-grid__col l-grid__col--span-12"
                name="sector_ids"
                label={t('form.sectors.selection_title')}
                availableTitle={t('form.sectors.available')}
                selectedTitle={t('form.sectors.selected')}
                options={availableSectors?.map(s => ({ id: s.id, label: s.name })) || []}
                rules={{ 
                    validate: (val: number[]) => val.length > 0 || t('form.sectors.error.required') 
                }}
              />

              <div className="l-grid__col l-grid__col--span-12 l-grid l-grid--inner u-margin-top-md">
                <Form.Button additionalClassName={btnClass} type="submit">
                  <Check size={16} /> {t("form.submit")}
                </Form.Button>
                <Form.Button additionalClassName={btnClass} type="reset" color='secondary'>
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
          additionalClassName={styles['p-insert-company__keep-in-page']}
        />}
      </Card>}
    </div>
  );
};

export default InsertGroupCompany;
