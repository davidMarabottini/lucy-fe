import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import detailStyles from "../Details.module.scss";
import { useContracts } from "@/hooks/api/ContractHooks";
import { useGetEmployeesByContractId } from "@/hooks/api/useEmployeesHooks";
import type { Contract } from "@/api/contractService";
import type { EmployeeContractAssignment } from "@/api/employeesService";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";
import Table from "@/components/organisms/Table/Table";
import Button from "@/components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { ChevronRight, Users, X } from "lucide-react";
import { useState } from "react";
import { useEmployeeDetailStore } from "@/zustand/employeeDetailState";

export const EmployeesContractCard = ({ employeeId }: { employeeId: string }) => {
  const { t } = useTranslation("employee", { keyPrefix: "details.contracts" });
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const setSelectedContractId = useEmployeeDetailStore((s) => s.setSelectedContractId);

  const { data: assignedEmployees } = useGetEmployeesByContractId(selectedContract?.id ?? 0);

  const handleContractClick = (row: Contract) => {
    if (selectedContract?.id === row.id) {
      setSelectedContract(null);
      setSelectedContractId(null);
    } else {
      setSelectedContract(row);
      setSelectedContractId(row.id);
    }
  };

  return (
    <Card additionalClassName={detailStyles["p-employee-detail__card"]}>
      <Typography variant="h2" additionalClasses={detailStyles["p-employee-detail__title"]}>
        {t("subtitle")}
      </Typography>

      <TablePaginated<Contract>
        useQueryHook={useContracts}
        initialPerPage={10}
        filterConfig={[
          { key: 'employee_id', placeholder: '', label: '', value: employeeId, type: 'hidden' },
        ]}
        columns={[
          { key: 'contract_code', header: t('table.contract_code') },
          { key: 'client', header: t('table.client'), value: (row) => row.client?.name || '-' },
          { key: 'provider', header: t('table.provider'), value: (row) => row.provider?.name || '-' },
          { key: 'start_date', header: t('table.start_date'), value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-' },
          { key: 'end_date', header: t('table.end_date'), value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-' },
        ]}
        getRowKey={(row) => String(row.id)}
        actions={[
          row => (
            <Button
              key="employees"
              color="custom"
              onClick={() => handleContractClick(row)}
              title={t("employees.subtitle")}
            >
              <Users size={18} />
            </Button>
          ),
          row => <Link key="detail" to={`/contracts/${row.id}`}><ChevronRight /></Link>,
        ]}
      />

      {selectedContract && (
        <div style={{ marginTop: 'var(--space-lg, 1.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm, 0.5rem)' }}>
            <Typography variant="h4">
              {t("employees.subtitle")}: {selectedContract.contract_code}
            </Typography>
            <Button color="custom" onClick={() => { setSelectedContract(null); setSelectedContractId(null); }}>
              <X size={18} />
            </Button>
          </div>

          {assignedEmployees && assignedEmployees.length > 0 ? (
            <Table<EmployeeContractAssignment>
              key={selectedContract.id}
              data={assignedEmployees}
              columns={[
                { key: '__name', header: t('employees.table.name'), value: (row) => `${row.employee.name} ${row.employee.surname}` },
                { key: '__email', header: t('employees.table.email'), value: (row) => row.employee.email },
                { key: '__start_date', header: t('employees.table.start_date'), value: (row) => new Date(row.start_date).toLocaleDateString('it-IT') },
                { key: '__end_date', header: t('employees.table.end_date'), value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-' },
              ]}
              getRowKey={(row) => String(row.assignment_id)}
            />
          ) : (
            <Typography variant="body">{t("employees.noEmployees")}</Typography>
          )}
        </div>
      )}
    </Card>
  );
};

export default EmployeesContractCard;
