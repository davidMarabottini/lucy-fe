import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useGroupCompanyDetail } from "@/hooks/api/GroupCompanyHooks"; // Hook per società interna
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, Hash, Tag } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import type { Contract } from "@/api/contractService";
import { useContracts } from "@/hooks/api/ContractHooks";
import clsx from "clsx";

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
        <div className={styles["p-company-detail__container"]}>
          <div>
            <Typography variant="h2">{data.name}</Typography>
          </div>

          <div className={styles["p-company-detail__client-sheet"]}>
            <div className={styles["p-company-detail__detail-column"]}>
              <Typography variant="h4" className={styles['p-company-details__subtitle-section']}>
                {t("section.info")}
              </Typography>
              <div>
                {data.vat_number && (
                  <div className="flex items-center gap-2">
                    <Hash size={18} /> <strong>{t("fields.vat")}:</strong> {data.vat_number}
                  </div>
                )}
                {data.sectors && data.sectors.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
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
          {t("contracts")}
        </Typography>
        
        <TablePaginated<Contract>
          useQueryHook={useContracts} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_code', placeholder: '', label: t('filters.code')},
            { key: 'description', placeholder: '', label: t('filters.description') },
            { key: 'provider_company_id', value: companyId, type: 'hidden' }
          ]}  
          
          columns={[
            {
              key: 'contract_code',
              header: t('table.contract_code')
            },
            {
              key: 'client',
              header: t('table.client'),
              value: (row) => row.client?.name || '-'
            },
            {
              key: 'start_date',
              header: t('table.start_date'),
              value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-'
            },
            {
              key: 'end_date',
              header: t('table.end_date'),
              value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-'
            },
            {
              key: 'description',
              header: t('table.description'),
              value: (row) => row.description || '-'
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default GroupCompanyDetailPage;