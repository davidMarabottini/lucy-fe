import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useClientDetail } from "@/hooks/api/useClientHooks";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft } from "lucide-react"; // Map
import styles from './Details.module.scss'
import { useTranslation } from "react-i18next";

import ClientInfoCard from "./components/ClientInfoCard";
import { ContractsCard } from "./components/ContractsCard";
import { MapCard } from "./components/MapCard";

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
      <ClientInfoCard client={data} />
      <ContractsCard clientId={clientId!} />
      <MapCard clientId={clientId!} />
    </div>
  );
};

export default ClientDetailPage;
