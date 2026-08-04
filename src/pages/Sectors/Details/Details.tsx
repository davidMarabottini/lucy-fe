import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useSectorDetail } from "@/hooks/api/useSectors";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Layers, ChevronLeft, FileText } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const SectorDetailPage = () => {
  const { idSector: sectorIdParams } = useParams<{ idSector?: string }>();
  const sectorId = sectorIdParams ? parseInt(sectorIdParams, 10) : 0;

  const { data, isLoading, error } = useSectorDetail(sectorId);
  const { t } = useTranslation("sector", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div className={styles["p-sector-detail"]}>
      {/* Header con Titolo e Back */}
      <Card additionalClassName={clsx(styles["p-sector-detail__card"], styles["p-sector-detail__card-title"])}>
        <div className={styles["p-sector-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-sector-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.SECTORS}>
            <ChevronLeft />
          </LinkComponent>
        </div>
      </Card>

      {/* Dettaglio Settore */}
      <Card additionalClassName={styles["p-sector-detail__card"]}>
        <div className={styles["p-sector-detail__container"]}>
          <Layers size={180} className={styles["p-sector-detail__icon"]} />
          <div>
            <div>
              <Typography variant="h1">{data.name}</Typography>
            </div>

            <div className={styles["p-sector-detail__sheet"]}>
              <div>
                {data.name && (
                  <div>
                    <Layers size={18} /> <strong>{t("fields.name")}:</strong> {data.name}
                  </div>
                )}
                {data.description && (
                  <div>
                    <FileText size={18} /> <strong>{t("fields.description")}:</strong> {data.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SectorDetailPage;
