import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, Calendar, Briefcase, File } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Contract } from "@/api/types";
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
        <div className={styles["p-contract-detail__container"]} style={{ flexDirection: 'row' }}>
          <File size={180} className={styles["p-contract-detail__icon"]} style={{ borderRadius: "100%", background: "#f0f0f0",  padding: '24px'}} />
          <div>
            <div>
              <Typography variant="h1">{t("contract_code", { contract_code: data.contract_code })}</Typography>
            </div>
            <div className={styles["p-contract-detail__contract-sheet"]} style={{ flexDirection: 'row', gap: '16px', alignItems: 'center', marginTop: '32px', marginLeft: '32px' }}>
              <div>
                <div className={styles["p-contract-detail__info-detail"]}>
              <Calendar size={18} />
              <strong>{t("fields.period")}:</strong>
              {data.start_date ? new Date(data.start_date).toLocaleDateString('it-IT') : '...'} -
              {data.end_date ? new Date(data.end_date).toLocaleDateString('it-IT') : t("ongoing")}
            </div>
            <div className={styles["p-contract-detail__info-detail"]}>
              <Briefcase size={18} />
              <strong>{t("fields.client")}:</strong> 
              <LinkComponent
              style={{ display: 'flex', gap: '8px' }}
              to={rewriteRoute(ROUTES.CLIENT_DETAIL, { ':clientId': data.client?.id.toString() })}
              color="primary"
            >{data.client?.name}</LinkComponent>
            </div>
            <div className={styles["p-contract-detail__info-detail"]}>
              <Briefcase size={18} />
              <strong>{t("fields.provider")}:</strong> {data.provider_company?.name}
            </div>
              </div>
            </div>
          </div>
            <div className={styles["p-contract-detail__description"]} style={{ borderLeft: '4px solid #f0f0f0', marginLeft: '32px', paddingLeft: '32px' }}>
              <Typography variant="h4">{data.description}</Typography>
            </div>
        </div>
      </Card>
    </>
  );
};

export default CardContract;
