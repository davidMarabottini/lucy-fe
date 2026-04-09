import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import styles from './List.module.scss'; 
import Table from "@/components/organisms/Table/Table";
import { type WorkScheduleType } from "@/api/workScheduleTypeService";
import { ROUTES } from "@/constants/routes";
import { PlusCircle, Trash2, HelpCircle } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import * as Icons from "lucide-react";

const WorkScheduleTypeList = () => {
  const { data: scheduleTypes, isLoading, error } = useWorkScheduleTypes();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curType, setCurType] = useState<WorkScheduleType | undefined>();

  const { t } = useTranslation("workScheduleType", { keyPrefix: "list" });

  const openDeleteModalHdlr = (type: WorkScheduleType) => {
    setCurType(type);
    setOpenModal(true);
  };

  if (isLoading) return <div className={styles["p-wst__loading"]}>{t("additiveMessages.loading")}</div>;
  if (error) return <Typography color="error">{t("additiveMessages.updateError")}</Typography>;
  if (!scheduleTypes) return null;

  return (
    <div className={styles["p-wst"]}>
      {curType && (
        <DeleteModal 
          openModal={openModal} 
          setOpenModal={setOpenModal} 
          curType={curType} 
        />
      )}
      
      <Card additionalClassName={styles["p-wst__card-title"]}>
        <div className={styles["p-wst__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-wst__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.WORK_SCHEDULE_TYPE_INSERT}>
              <PlusCircle size={24} />
            </LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-wst__card"]}>
        <Table<WorkScheduleType>
          data={scheduleTypes}
          columns={[
            {
              key: 'icon_name',
              header: '', // Colonna per l'icona
              value: (row) => {
                //TODO: gestire il caso in cui l'icona non esista o non sia definita
                const Icon = (Icons as any)[row.icon_name] || HelpCircle;
                return <Icon size={20} />;
              }
            },
            {
              key: 'name', 
              header: t('table.name') 
            },
            { 
              key: 'period', 
              header: t('table.period'),
              value: (row) => row.period !== 'NONE' ? t(`periods.${row.period}`) : t('periods.NONE')
            },
            { 
              key: 'frequency', 
              header: t('table.frequency'),
              value: (row) => row.frequency ? `${row.frequency}x` : '-'
            },
            { 
              key: 'description', 
              header: t('table.description'),
              value: (row) => row.description || '-'
            }
          ]}
          actions={[
            (row) => (
              <Button
                key="remove"
                color="custom"
                additionalClassName={styles["p-wst__btn-delete"]}
                onClick={() => openDeleteModalHdlr(row)}
              >
                <Trash2 size={18} />
              </Button>
            ),
          ]}
        />
      </Card>
    </div>
  );
};

export default WorkScheduleTypeList;