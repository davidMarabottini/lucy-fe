import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useStoreDetail } from "@/hooks/api/useStores";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Store, ChevronLeft, FileText, Building, Tag } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const StoreDetailPage = () => {
  const { idStore: storeIdParams } = useParams<{ idStore?: string }>();
  const storeId = storeIdParams ? parseInt(storeIdParams, 10) : 0;

  const { data, isLoading, error } = useStoreDetail(storeId);
  const { t } = useTranslation("features/store", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div className={styles["p-store-detail"]}>
      <Card additionalClassName={clsx(styles["p-store-detail__card"], styles["p-store-detail__card-title"])}>
        <div className={styles["p-store-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-store-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.STORE_LIST}>
            <ChevronLeft />
          </LinkComponent>
        </div>
      </Card>

      {/* Dettaglio Store */}
      <Card additionalClassName={styles["p-store-detail__card"]}>
        <div className={styles["p-store-detail__container"]}>
          <Store size={180} className={styles["p-store-detail__icon"]} />
          <div>
            <div>
              <Typography variant="h1">{data.name}</Typography>
            </div>

            <div className={styles["p-store-detail__sheet"]}>
              <div>
                {data.company_id && (
                  <div>
                    <Building size={18} /> <strong>{t("fields.company_id")}:</strong> {data.company_id}
                  </div>
                )}
                {data.name && (
                  <div>
                    <Store size={18} /> <strong>{t("fields.name")}:</strong> {data.name}
                  </div>
                )}
                {data.description && (
                  <div>
                    <FileText size={18} /> <strong>{t("fields.description")}:</strong> {data.description}
                  </div>
                )}
                {data.price !== undefined && (
                  <div>
                    <Tag size={18} /> <strong>{t("fields.price")}:</strong> {data.price}
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

export default StoreDetailPage;
