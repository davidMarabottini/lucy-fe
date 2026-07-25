import Card from '@components/atoms/Card/Card';
import clsx from 'clsx';
import styles from "./Edit.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
// import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';
import { useParams, useNavigate } from 'react-router-dom';
import { useGroupCompanyDetail, useUpdateGroupCompany } from '@/hooks/api/GroupCompanyHooks';
import { useSectors } from '@/hooks/api/useSectors';
import { type GroupCompanyPayload } from '@/api/types';
import type { UseFormReturn } from 'react-hook-form';

const EditGroupCompany = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const idNumber = Number(companyId);
  const navigate = useNavigate();
  
  const { t } = useTranslation('groupCompany', { keyPrefix: 'edit' }); // Assicurati di avere il keyPrefix "edit" nelle traduzioni
  const { data: companyData, isLoading, error } = useGroupCompanyDetail(idNumber);
  const { mutate: updateCompany } = useUpdateGroupCompany(idNumber);
  const { data: availableSectors } = useSectors();

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!companyData) return null;

  const onSubmit = (values: GroupCompanyPayload, methods: UseFormReturn<GroupCompanyPayload>) => {
    updateCompany(values, {
      onSuccess: () => {
        // Opzionale: torna alla pagina di dettaglio o lista dopo il successo
        navigate(`/group-companies/${idNumber}`);
      }
    });
  };

  const btnClass = clsx(styles['p-edit-company__button'], "l-grid__col l-grid__col--span-6");

  // Mappiamo i dati esistenti per i defaultValues del form
  const defaultValues: GroupCompanyPayload = {
    name: companyData.name || '',
    vat_number: companyData.vat_number || '',
    sector_ids: companyData.sectors?.map(s => s.id) || []
  };

  return (
    <div className={styles['p-edit-company']}>
      {/* Header */}
      <Card additionalClassName={styles["p-edit-company__card-title"]}>
        <div className={styles["p-edit-company__card-title-internal"]}>
          <Typography variant="h2">{t("title")}</Typography>
          <LinkComponent to={`/group-companies/${idNumber}`}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {/* Form Card */}
      <Card additionalClassName="l-grid__col l-grid__col--span-12">
        <Form<GroupCompanyPayload>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
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
                <Form.Button 
                  additionalClassName={btnClass} 
                  type="button" 
                  color='secondary'
                  onClick={() => navigate(`/group-companies/${idNumber}`)}
                >
                  <X size={16} /> {t("form.cancel")}
                </Form.Button>
              </div>
            </div>
          </Stack>
        </Form>
      </Card>
    </div>
  );
};

export default EditGroupCompany;