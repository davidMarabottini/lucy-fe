import Card from "@/components/atoms/Card/Card"
import clsx from "clsx"
import styles from './SetDetails.module.scss';
import Typography from "@/components/atoms/Typography/Typography"
import { ROUTES } from "@/constants/routes";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ChevronLeft } from "lucide-react";
import { useContractDetail } from "@/hooks/api/ContractHooks";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CardEmployee from "./components/CardEmployee";
import CardForm from "./components/CardForm";

const SetDetails = () => {
  const { contractId } = useParams<{ contractId: string }>();

  const { data, isLoading, error } = useContractDetail(Number(contractId));
  const { t } = useTranslation("contract", { keyPrefix: "setDetails" });
  
  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data || !contractId) return null;

  return (
    <div>
      <Card additionalClassName={clsx(styles["p-contract-detail__card"], styles["p-contract-detail__card-title"])}>
        <div className={styles["p-contract-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
            {t("title")}: {data.contract_code}
          </Typography>
          <LinkComponent to={ROUTES.CONTRACT_LIST}><ChevronLeft /></LinkComponent>
        </div>
    </Card>
    <CardForm contractId={contractId} />
<CardEmployee contractId={Number(contractId)} />
  </div>
  );
}

export default SetDetails;