import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, Calendar, Briefcase } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Contract } from "@/api/contractService";
import { rewriteRoute } from "@/utils/routes";
import clsx from "clsx";
import styles from "../Details.module.scss";

const CardContract = ({ data }: { data: Contract }) => {
  const { t } = useTranslation("contract", { keyPrefix: "details" });
  return (
    <>
      <Card additionalClassName={clsx(styles["p-contract-detail__card"], styles["p-contract-detail__card-title"])}>
        <div className={styles["p-contract-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-contract-detail__title"]}>
            {t("title")}: {data.contract_code}
          </Typography>
          <LinkComponent to={ROUTES.CONTRACT_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-contract-detail__card"]}>
        <div className={styles["p-contract-detail__container"]}>
          <div className={styles["p-contract-detail__header-info"]}>
            <LinkComponent
              style={{ display: 'flex', gap: '8px' }}
              to={rewriteRoute(ROUTES.CLIENT_DETAIL, { ':clientId': data.client?.id.toString() })}
              color="primary"
            >
              <ChevronRight size={20} />
              <Typography variant="h3">{data.client?.name || t("no_client")}</Typography>
            </LinkComponent>
            <Typography variant="body" className="text-gray-500">{data.description}</Typography>
          </div>

          <div className={styles["p-contract-detail__info-grid"]}>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <strong>{t("fields.period")}:</strong>
              {data.start_date ? new Date(data.start_date).toLocaleDateString('it-IT') : '...'} -
              {data.end_date ? new Date(data.end_date).toLocaleDateString('it-IT') : t("ongoing")}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={18} />
              <strong>{t("fields.provider")}:</strong> {data.provider?.name}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardContract;
