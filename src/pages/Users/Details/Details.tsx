import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useUserDetail } from "@/hooks/api/useUserHooks"; // Hook per società interna
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Building, ChevronLeft, Mail, User, User2 } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const UsersDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, error } = useUserDetail(Number(userId));
  const { t } = useTranslation("user", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Header con Titolo e Back */}
      <Card additionalClassName={clsx(styles["p-users-detail__card"], styles["p-users-detail__card-title"])}>
        <div className={styles["p-users-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-users-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.USER_LIST}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <Card additionalClassName={styles["p-users-detail__card"]}>
      <div className={styles["p-users-detail__container"]}>
        <Building size={180} className={styles["p-users-detail__icon"]} />
        <div>
          <div>
            <Typography variant="h1">{data?.name}</Typography>
          </div>

          <div className={styles["p-users-detail__client-sheet"]}>
            <div>
              {(data.name || data.surname) && (
                <div>
                  <User size={18} /> <strong>{t("fields.name")}:</strong> {data.name} {data.surname}
                </div>
              )}
              {data.username && (
                <div>
                  <User2 size={18} /> <strong>{t("fields.username")}:</strong> {data.username}
                </div>
              )}
              {data.email && (
                <div>
                  <Mail size={18} /> <strong>{t("fields.email")}:</strong> {data.email}
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

export default UsersDetailPage;