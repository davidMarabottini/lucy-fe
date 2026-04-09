import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useWorkActivities } from "@/hooks/api/useWorkActivity"; // Corretto path hook
import styles from './List.module.scss'
import { type WorkActivity } from "@/api/workActivityService";
import { ROUTES } from "@/constants/routes";
import { PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import TablePaginated from "@/components/organisms/TablePaginated/TablePaginated";

const WorkActivitiesList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curActivity, setCurActivity] = useState<WorkActivity | undefined>();

  const { t } = useTranslation("workActivity", {keyPrefix: "list"});

  const openDeleteModalHdlr = (activity: WorkActivity) => {
    setCurActivity(activity);
    setOpenModal(true);
  };

  return (
    <div className={styles["p-work-activities"]}>
      {curActivity && (
        <DeleteModal openModal={openModal} setOpenModal={setOpenModal} curWorkActivity={curActivity} />
      )}
      
      <Card additionalClassName={styles["p-work-activities__card-title"]}>
        <div className={styles["p-work-activities__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-work-activities__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.WORK_ACTIVITIES_INSERT}>
              <PlusCircle size={24} />
            </LinkComponent>
        </div>
      </Card>

      <Card additionalClassName={styles["p-work-activities__card"]}>
        <TablePaginated<WorkActivity>
          useQueryHook={useWorkActivities}
          filterConfig={[
            {key: 'name', placeholder: '', label:t("table.filter.name")}
          ]}
          columns={[
            { key: 'name', header: t('table.name') },
            { key: 'description', header: t('table.description') },
          ]}
          actions={[
            (row) => (
              <Button
                key="remove"
                color="custom"
                additionalClassName={styles["p-work-activities__btn-delete"]}
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

export default WorkActivitiesList;