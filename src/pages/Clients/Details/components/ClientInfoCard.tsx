import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import { Mail, Phone } from "lucide-react";
import type { LibemaxClientDetail } from "@/api/clientService";

const ClientInfoCard = ({ client }: { client?: LibemaxClientDetail }) => {
  const { t } = useTranslation("client", { keyPrefix: "details" });
  return (
    <Card additionalClassName={styles["p-client-detail__card"]}>
      <div className={styles["p-client-detail__container"]}>
        <div>
          <Typography variant="h4">{client?.name}</Typography>
        </div>

        <div className={styles["p-client-detail__client-sheet"]}>
          <div className={styles["p-client-detail__detail-column"]}>
            <Typography variant="h4" className={styles['p-client-details__subtitle-section']}>
              {t("section.contact")}
            </Typography>
            <div>
              {client?.phone && <div><Phone /> {client.phone}</div>}
              {client?.email && <div><Mail /> {client.email}</div>}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ClientInfoCard;
