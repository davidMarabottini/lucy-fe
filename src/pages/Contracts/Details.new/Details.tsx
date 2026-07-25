import { useParams } from "react-router-dom";
import { useContractDetail } from "@/hooks/api/ContractHooks";
import { useDeleteWorkSchedule } from "@/hooks/api/useWorkScheduleHooks";
import { useTranslation } from "react-i18next";
import CardContract from "./components/CardContract";
import CardContractDetails from "./components/CardContractDetails";

const ContractDetailPage = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const { data, isLoading, error } = useContractDetail(Number(contractId));
  const { mutate: deleteSchedule } = useDeleteWorkSchedule();
  const { t } = useTranslation("contract", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data || !contractId) return null;

  return (
    <div className="p-contract-detail__container">
      <CardContract data={data} />
      <CardContractDetails contractId={contractId} deleteSchedule={deleteSchedule} />
    </div>
  );
};

export default ContractDetailPage;