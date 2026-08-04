import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useWorkActivityDetail } from "@/hooks/api/useWorkActivity";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Briefcase, ChevronLeft, FileText } from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const WorkActivityDetailPage = () => {
  const { idActivity: activityIdParams } = useParams<{ idActivity?: string }>();
  const activityId = activityIdParams ? parseInt(activityIdParams, 10) : 0;
  
  const { data, isLoading, error } = useWorkActivityDetail(activityId);
  const { t } = useTranslation("workActivity", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div className={styles["p-work-activity-detail"]}>
      {/* Header con Titolo e Back */}
      <Card additionalClassName={clsx(styles["p-work-activity-detail__card"], styles["p-work-activity-detail__card-title"])}>
        <div className={styles["p-work-activity-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-work-activity-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.WORK_ACTIVITIES}>
            <ChevronLeft />
          </LinkComponent>
        </div>
      </Card>

      {/* Dettaglio Attività */}
      <Card additionalClassName={styles["p-work-activity-detail__card"]}>
        <div className={styles["p-work-activity-detail__container"]}>
          <Briefcase size={180} className={styles["p-work-activity-detail__icon"]} />
          <div>
            <div>
              <Typography variant="h1">{data.name}</Typography>
            </div>

            <div className={styles["p-work-activity-detail__sheet"]}>
              <div>
                {data.name && (
                  <div>
                    <Briefcase size={18} /> <strong>{t("fields.name")}:</strong> {data.name}
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

export default WorkActivityDetailPage;