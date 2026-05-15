import { useParams } from "react-router-dom";
import { useContractDetail } from "@/hooks/api/ContractHooks";
import { useDeleteWorkSchedule } from "@/hooks/api/useWorkScheduleHooks";
import { useTranslation } from "react-i18next";
import CardContract from "./components/CardContract";
import CardForm from "./components/CardForm";
import CardContractDetails from "./components/CardContractDetails";

// --- Main Page ---
const ContractDetailPage = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const { data, isLoading, error } = useContractDetail(Number(contractId));
  const { mutate: deleteSchedule } = useDeleteWorkSchedule();
  const { t } = useTranslation("contract", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data || !contractId) return null;

  return (
    <div>
      <CardContract data={data} />
      <CardForm contractId={contractId} />
      <CardContractDetails contractId={contractId} deleteSchedule={deleteSchedule} />
    </div>
  );
};

export default ContractDetailPage;