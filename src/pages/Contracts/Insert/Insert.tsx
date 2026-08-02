import Card from '@components/atoms/Card/Card';
import styles from "./Insert.module.scss";
import { useTranslation } from 'react-i18next';
import Form from '@components/organisms/form/Form';
import Stack from '@components/atoms/Stack/Stack';
import Typography from '@components/atoms/Typography/Typography';
import { Check, ChevronLeft, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';

// Hooks
import { useContractDetail, useInsertContract, useUpdateContract } from '@/hooks/api/ContractHooks';
import { useGroupCompanies } from '@/hooks/api/GroupCompanyHooks';
import { useLibemaxClients } from '@/hooks/api/useClientHooks'; // Assumendo esista questo hook
import Switch from '@/components/atoms/Switch/Switch';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const InsertContract = () => {
  const { idContract: contractIdParams } = useParams<{ idContract?: string }>();
  const contractId = contractIdParams ? parseInt(contractIdParams, 10) : undefined;
  const isEditMode = Boolean(contractId);

  const [locNavigate, setLockNavigate] = useState<boolean>(false)
  const { t } = useTranslation('contract', { keyPrefix: 'insert' });
  const { data: contractData, isFetched: isFetchedContract } = useContractDetail(contractId ?? 0, { enabled: isEditMode });
  const { mutate: insertContract } = useInsertContract(locNavigate);
  const { mutate: editContract } = useUpdateContract(contractId);
  
  // Dati per le DualListBox
  const { data: companies } = useGroupCompanies();
  const { data: clients } = useLibemaxClients();

  // TODO: definire meglio i tipi di values in base al form
  const onSubmit = (values: any, methods: UseFormReturn<any>) => {
    const { dirtyFields } = methods.formState;

    // Trasformiamo il range del DatePicker in start/end date per il backend
    const [start, end] = values.date_range || [null, null];
    
    const payload = {
      contract_code: values.contract_code,
      description: values.description,
      group_company_id: values.provider_ids?.[0],
      client_id: values.client_ids?.[0],
      start_date: start?.toISOString().split('T')[0],
      end_date: end?.toISOString().split('T')[0],
    };

    if (isEditMode) {
      const modifiedData: Record<string, unknown> = {};

      if (dirtyFields.contract_code) {
        modifiedData.contract_code = payload.contract_code;
      }
      if (dirtyFields.description) {
        modifiedData.description = payload.description;
      }
      if (dirtyFields.provider_ids) {
        modifiedData.group_company_id = payload.group_company_id;
      }
      if (dirtyFields.client_ids) {
        modifiedData.client_id = payload.client_id;
      }
      if (dirtyFields.date_range) {
        modifiedData.start_date = payload.start_date;
        modifiedData.end_date = payload.end_date;
      }

      editContract(modifiedData as any);
      return;
    }

    insertContract(payload);

    methods.reset();
  };

  return (
    <div className={styles['p-insert-contract']}>
      <Card additionalClassName={styles["p-insert-contract__card-title"]}>
        <div className={styles["p-insert-contract__card-title-internal"]}>
          <Typography variant="h2">{t("title")}</Typography>
          <LinkComponent to={ROUTES.CONTRACT_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      {(!isEditMode || isFetchedContract) && <Card>
        <Form
          onSubmit={onSubmit}
          defaultValues={
            !isEditMode
              ? { contract_code: '', provider_ids: [], client_ids: [], date_range: [null, null], description: '' }
              : {
                  contract_code: contractData?.contract_code ?? '',
                  provider_ids: contractData?.provider_company?.id ? [contractData.provider_company.id] : [],
                  client_ids: contractData?.client?.id ? [contractData.client.id] : [],
                  date_range: [
                    contractData?.start_date ? new Date(contractData.start_date) : null,
                    contractData?.end_date ? new Date(contractData.end_date) : null,
                  ],
                  description: contractData?.description ?? ''
                }
          }
        >
          <Stack spacing='lg'>
            <div className="l-grid">
              
              {/* Codice Contratto */}
              <Form.Input
                className="l-grid__col l-grid__col--span-6"
                name="contract_code"
                label={t('form.contract_code.label')}
                rules={{ required: t('form.contract_code.required') }}
              />

              {/* Range Date */}
              <Form.DatePicker
                className="l-grid__col l-grid__col--span-6"
                name="date_range"
                label={t('form.date_range.label')}
                selectsRange={true}
                rules={{ required: t('form.date_range.required') }}
              />

              <Form.FilteredDualListBox
                className="l-grid__col l-grid__col--span-6"
                name="provider_ids"
                label={t('form.provider.label')}
                options={companies?.map(c => ({ id: c.id, label: c.name })) || []}
                rules={{ 
                  validate: v => v.length === 1 || "Seleziona esattamente un'azienda" 
                }}
              />

              <Form.FilteredDualListBox
                className="l-grid__col l-grid__col--span-6"
                name="client_ids"
                label={t('form.client.label')}
                options={clients?.map(c => ({ id: c.id, label: c.name })) || []}
                rules={{ 
                  validate: v => v.length === 1 || "Seleziona esattamente un cliente" 
                }}
              />

              {/* Descrizione */}
              <Form.TextArea
                className="l-grid__col l-grid__col--span-12"
                name="description"
                label={t('form.description.label')}
                rows={4}
              />

              {/* Azioni */}
              <div className="l-grid__col l-grid__col--span-12 l-grid l-grid--inner u-margin-top-md">
                <Form.Button type="submit" className="l-grid__col l-grid__col--span-6">
                  <Check size={16} /> {t("submit")}
                </Form.Button>
                <Form.Button type="reset" color='secondary' className="l-grid__col l-grid__col--span-6">
                  <X size={16} /> {t("reset")}
                </Form.Button>
              </div>

            </div>
          </Stack>
        </Form>
        {!isEditMode && <Switch
          onChange={res => setLockNavigate(!!res)}
          value={locNavigate}
          label={t('keepInPage')}
          additionalClassName={styles['p-insert-contract__keep-in-page']}
        />}
      </Card>}
    </div>
  );
};

export default InsertContract;