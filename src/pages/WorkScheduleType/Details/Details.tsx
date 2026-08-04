import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useWorkScheduleTypeDetail } from "@/hooks/api/WorkScheduleTypeHooks";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { Calendar, ChevronLeft, FileText, File, Timer } from "lucide-react";
import * as LucideIcons from "lucide-react";
import styles from './Details.module.scss';
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const WorkScheduleTypeDetailPage = () => {
  const { idWorkScheduleType: workScheduleTypeIdParams } = useParams<{ idWorkScheduleType?: string }>();
  const workScheduleTypeId = workScheduleTypeIdParams ? parseInt(workScheduleTypeIdParams, 10) : 0;

  const { data, isLoading, error } = useWorkScheduleTypeDetail(workScheduleTypeId);
  const { t } = useTranslation("workScheduleType", { keyPrefix: "details" });

  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if (!data) return null;

  return (
    <div className={styles["p-work-schedule-type-detail"]}>
      {/* Header con Titolo e Back */}
      <Card additionalClassName={clsx(styles["p-work-schedule-type-detail__card"], styles["p-work-schedule-type-detail__card-title"])}>
        <div className={styles["p-work-schedule-type-detail__card-title-internal"]}>
          <Typography variant="h2" additionalClasses={styles["p-work-schedule-type-detail__title"]}>
            {t("title")}
          </Typography>
          <LinkComponent to={ROUTES.WORK_SCHEDULE_TYPE_LIST}>
            <ChevronLeft />
          </LinkComponent>
        </div>
      </Card>

      {/* Dettaglio Tipo Orario */}
      <Card additionalClassName={styles["p-work-schedule-type-detail__card"]}>
        <div className={styles["p-work-schedule-type-detail__container"]}>
          {/*al posto di questa icona devo dinamicizzarla con il contenuto di icon_name */}
          {/* <Calendar size={180} className={styles["p-work-schedule-type-detail__icon"]} /> */}
          {(() => {
            const DynamicIcon =
              (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[data.icon_name] ??
              LucideIcons.Calendar;
            return <DynamicIcon size={180} className={styles["p-work-schedule-type-detail__icon"]} />;
          })()}

          <div>
            <div>
              <Typography variant="h1">{data.name}</Typography>
            </div>

            <div className={styles["p-work-schedule-type-detail__sheet"]}>
              <div>
                {data.name && (
                  <div>
                    <File size={18} /> <strong>{t("fields.name")}:</strong> {data.name}
                  </div>
                )}
                {data.period && (
                  <div>
                    <Calendar size={18} /> <strong>{t("fields.period")}:</strong> {data.period}
                  </div>
                )}
                {data.frequency && (
                  <div>
                    <Timer size={18} /> <strong>{t("fields.frequency")}:</strong> {data.frequency}
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

export default WorkScheduleTypeDetailPage;