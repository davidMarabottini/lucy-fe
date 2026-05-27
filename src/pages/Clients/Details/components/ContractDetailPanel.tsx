import Typography from "@/components/atoms/Typography/Typography";
import Button from "@/components/atoms/Button/Button";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetEmployeesByContract } from "@/hooks/api/ContractHooks";
import type { Contract } from "@/api/types";
import cardStyles from "./ContractsCard.module.scss";
import { ContractSchedulesTable } from "./ContractSchedulesTable.tsx";
import { ContractEmployeesList } from "./ContractEmployeesList.tsx";

interface ContractDetailPanelProps {
  contract: Contract;
  selectedDate: string;
  onClose: () => void;
}

export const ContractDetailPanel = ({ contract, selectedDate, onClose }: ContractDetailPanelProps) => {
  const { t } = useTranslation("client", { keyPrefix: "details.contracts" });
  const { data: employees } = useGetEmployeesByContract(contract.id, selectedDate);

  return (
    <div className={cardStyles["c-contracts-card__schedules-panel"]}>
      <div className={cardStyles["c-contracts-card__schedules-header"]}>
        <Typography variant="h4">
          {t("schedules.subtitle")}: {contract.contract_code}
        </Typography>
        <Button color="custom" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <ContractSchedulesTable contractId={contract.id} selectedDate={selectedDate} />

      {employees && <ContractEmployeesList employees={employees} />}
    </div>
  );
};
