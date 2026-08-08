import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import detailStyles from "../Details.module.scss";
import { useContracts } from "@/hooks/api/ContractHooks";
import type { Contract } from "@/api/types";
import Paginated from "@/components/organisms/Paginated/Paginated";
import Button from "@/components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { ChevronRight, List } from "lucide-react";
import { useState } from "react";
import { useClientDetailStore } from "@/zustand/clientDetailState";
import { ContractDetailPanel } from "./ContractDetailPanel.tsx";
import Table from "@/components/organisms/Table/Table.tsx";

export const ContractsCard = ({ clientId }: { clientId: string }) => {
  const { t } = useTranslation("client", { keyPrefix: "details.contracts" });
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const selectedDate = useClientDetailStore((s) => s.selectedDate);

  const toggleContract = (row: Contract) =>
    setSelectedContract(prev => prev?.id === row.id ? null : row);

  return (
    <Card additionalClassName={detailStyles["p-client-detail__card"]}>
      <Typography variant="h2" additionalClasses={detailStyles["p-client-detail__title"]}>
        {t("subtitle")}
      </Typography>

      <Paginated<Contract>
        useQueryHook={useContracts}
        initialPerPage={10}
        filterConfig={[
          { key: 'contract_code', placeholder: '', label: 'Cerca Codice' },
          { key: 'description', placeholder: '', label: 'Cerca Descrizione' },
          { key: 'client_id', placeholder: '', label: 'Cerca Cliente', value: clientId, type: 'hidden' }
        ]}
      >
        {(res) => (
          <Table
            data={res}
            columns={[
              { key: 'contract_code', header: t('table.contract_code') },
              { key: 'provider', header: t('table.provider'), value: (row) => row.provider?.name || '-' },
              { key: 'client', header: t('table.client'), value: (row) => row.client?.name || '-' },
              { key: 'start_date', header: t('table.start_date'), value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-' },
              { key: 'end_date', header: t('table.end_date'), value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-' },
              { key: 'description', header: t('table.description'), value: (row) => row.description || '-' }
            ]}
            getRowKey={(row) => String(row.contract_code)}
            actions={row => [
               (
                <Button
                  key="schedules"
                  color="custom"
                  onClick={() => toggleContract(row)}
                  title={t("schedules.subtitle")}
                >
                  <List size={18} />
                </Button>
              ),
              <Link key="detail" to={`/contracts/${row.id}`}><ChevronRight /></Link>,
            ]}
            additionalContainer={(row) =>
              selectedContract?.id === row.id ? (
                <ContractDetailPanel
                  contract={selectedContract}
                  selectedDate={selectedDate}
                  onClose={() => setSelectedContract(null)}
                />
              ) : null
            }
          />
        )}
      </Paginated>
    </Card>
  );
};