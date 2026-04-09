import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useClientDetail } from "@/hooks/api/useClientHooks";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, Mail, Phone, Map } from "lucide-react";
import styles from './Details.module.scss'
import { useTranslation } from "react-i18next";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import type { Contract } from "@/api/contractService";
import { useContracts } from "@/hooks/api/ContractHooks";
import clsx from "clsx";

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { data, isLoading, error } = useClientDetail(Number(clientId));
  const {t} = useTranslation("client", {keyPrefix: "details"});

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if(!data) {return ""}
  return (
    <div>
      <Card additionalClassName={clsx(styles["p-client-detail__card"], styles["p-client-detail__card-title"])}>
        <div className={styles["p-client-detail__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-client-detail__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.LIBEMAX_CLIENTS}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <Card additionalClassName={styles["p-client-detail__card"]}>
        <div className={styles["p-client-detail__container"]}>
          <div>
            <Typography variant="h2">{data.name}</Typography>
          </div>

          <div className={styles["p-client-detail__client-sheet"]}>
            <div className={styles["p-client-detail__detail-column"]}>
              <Typography variant="h4" className={styles['p-client-details__subtitle-section']}>{t("section.contact")}</Typography>
              <div>
                {data.phone && <div><Phone /> {data.phone}</div>}
                {data.email && <div><Mail /> {data.email}</div>}
                {data.address && <div><Map />{data.address}</div>}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card additionalClassName={styles["p-client-detail__card"]}>
        <Typography variant="h2" additionalClasses={styles["p-client-detail__title"]}>
          {t("contracts")}
        </Typography>
        
        <TablePaginated<Contract>
          useQueryHook={useContracts} 
          initialPerPage={10} 
          filterConfig={[
            { key: 'contract_code', placeholder: '', label: 'Cerca Codice'},
            { key: 'description', placeholder: '', label: 'Cerca Descrizione' },
            { key: 'client_id', placeholder: '', label: 'Cerca Cliente', value: clientId, type: 'hidden'}
          ]}  
          
          columns={[
            {
              key: 'contract_code',
              header: t('table.contract_code')
            },
            {
              key: 'provider',
              header: t('table.provider'),
              value: (row) => row.provider?.name || '-'
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

export default ClientDetailPage;
