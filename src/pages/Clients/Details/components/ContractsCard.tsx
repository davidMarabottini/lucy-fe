import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { useContracts } from "@/hooks/api/ContractHooks";
import type { Contract } from "@/api/contractService";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";

export const ContractsCard = ({ clientId }: { clientId: string }) => {
  const { t } = useTranslation("client", { keyPrefix: "details" });

  return (
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
  )
}