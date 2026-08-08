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
import { useEmployeeDetailStore } from "@/zustand/employeeDetailState";
import Table from "@/components/organisms/Table/Table";

export const EmployeesContractCard = ({ employeeId }: { employeeId: string }) => {
  const { t } = useTranslation("employee", { keyPrefix: "details.contracts" });
  const selectedContractId = useEmployeeDetailStore((s) => s.selectedContractId);
  const setSelectedContractId = useEmployeeDetailStore((s) => s.setSelectedContractId);

  const toggleContract = (row: Contract) =>
    setSelectedContractId(selectedContractId === row.id ? null : row.id);

  return (
    <Card additionalClassName={detailStyles["p-employee-detail__card"]}>
      <Typography variant="h2" additionalClasses={detailStyles["p-employee-detail__title"]}>
        {t("subtitle")}
      </Typography>

      <Paginated<Contract>
        useQueryHook={useContracts}
        initialPerPage={10}
        filterConfig={[
          { key: 'employee_id', placeholder: '', label: '', value: employeeId, type: 'hidden' },
        ]}
      >
        {(res) => (
          <Table
            data={res}
            columns={[
              { key: 'contract_code', header: t('table.contract_code') },
              { key: 'client', header: t('table.client'), value: (row) => row.client?.name || '-' },
              { key: 'provider', header: t('table.provider'), value: (row) => row.provider?.name || '-' },
              { key: 'start_date', header: t('table.start_date'), value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-' },
              { key: 'end_date', header: t('table.end_date'), value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-' },
            ]}
            getRowKey={(row) => String(row.id)}
            actions={row => [
               (
                <Button
                  key="schedules"
                  color={selectedContractId === row.id ? "primary" : "custom"}
                  onClick={() => toggleContract(row)}
                  title={t("schedules.subtitle")}
                >
                  <List size={18} />
                </Button>
              ),
              row => <Link key="detail" to={`/contracts/${row.id}`}><ChevronRight /></Link>,
            ]}
          />
        )}
      </Paginated>
    </Card>
  );
};

export default EmployeesContractCard;
