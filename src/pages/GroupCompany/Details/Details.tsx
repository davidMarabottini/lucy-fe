import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useGroupCompanyDetail } from "@/hooks/api/GroupCompanyHooks"; // Hook per società interna
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Building, ChevronLeft, Hash, Tag } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import Paginated from "@/components/organisms/Paginated/Paginated";
import type { Contract } from "@/api/types";
import { useContracts } from "@/hooks/api/ContractHooks";
import clsx from "clsx";
import Table from "@/components/organisms/Table/Table";

const GroupCompanyDetailPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const { data, isLoading, error } = useGroupCompanyDetail(Number(companyId));
  const { t } = useTranslation("groupCompany", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Header con Titolo e Back */}
      <Card additionalClassName={clsx(styles["p-company-detail__card"], styles["p-company-detail__card-title"])}>
        <div className={styles["p-company-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-company-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.GROUP_COMPANIES}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <Card additionalClassName={styles["p-company-detail__card"]}>
      <div className={styles["p-company-detail__container"]} style={{ flexDirection: 'row' }}>
        <Building size={180} className={styles["p-company-detail__icon"]} style={{ borderRadius: "100%", background: "#f0f0f0",  padding: '24px'}} />
        <div>
          <div>
            <Typography variant="h1">{data?.name}</Typography>
          </div>

          <div style={{display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', marginTop: '32px', marginLeft: '32px' }}>
            <div>
              {data.vat_number && (
                <div>
                  <Hash size={18} /> <strong>{t("fields.vat")}:</strong> {data.vat_number}
                </div>
              )}
              {data.sectors && data.sectors.length > 0 && (
                <div>
                  <Tag size={18} /> 
                  <strong>{t("fields.sectors")}:</strong> 
                  {data.sectors.map(s => s.name).join(", ")}
                </div>
              )}
              </div>
            </div>
        </div>
      </div>
    </Card>
      {/* Tabella Contratti Correlati */}
      <Card additionalClassName={styles["p-company-detail__card"]}>
        <Typography variant="h2" additionalClasses={styles["p-company-detail__title"]}>
          {t("contracts.title")}
        </Typography>
        
        <Paginated<Contract>
          useQueryHook={useContracts} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_code', placeholder: '', label: t('contracts.filters.code')},
            { key: 'description', placeholder: '', label: t('contracts.filters.description') },
            { key: 'provider_company_id', value: companyId, type: 'hidden' }
          ]}  
        >
          {(res) => (
            <Table
              data={res}
              columns={[
                {
                  key: 'contract_code',
                  header: t('contracts.table.contract_code')
                },
                {
                  key: 'client',
                  header: t('contracts.table.client'),
                  value: (row) => row.client?.name || '-'
                },
                {
                  key: 'start_date',
                  header: t('contracts.table.start_date'),
                  value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-'
                },
                {
                  key: 'end_date',
                  header: t('contracts.table.end_date'),
                  value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-'
                },
                {
                  key: 'description',
                  header: t('contracts.table.description'),
                  value: (row) => row.description || '-'
                }
              ]}
              getRowKey={(row) => String(row.contract_code)}
            />
          )}
        </Paginated>
      </Card>
    </div>
  );
};

export default GroupCompanyDetailPage;