import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useWorkActivities } from "@/hooks/api/useWorkActivity"; // Corretto path hook
import styles from './List.module.scss'
import { type WorkActivity } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { Edit2, Eye, PlusCircle, Trash2 } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import Paginated from "@/components/organisms/Paginated/Paginated";
import Table from "@/components/organisms/Table/Table";
import { rewriteRoute } from "@/utils/routes";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { useViewStore } from "@/zustand/listViewAsCard";

const WorkActivitiesList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curActivity, setCurActivity] = useState<WorkActivity | undefined>();

  const { t } = useTranslation("workActivity", {keyPrefix: "list"});

  const openDeleteModalHdlr = (activity: WorkActivity) => {
    setCurActivity(activity);
    setOpenModal(true);
  };

  const isCardView = useViewStore((state) => state.isCardView)

  const actions = (activity: WorkActivity) => [
    <LinkComponent
      key="edit"
      color="custom"
      to={rewriteRoute(ROUTES.WORK_ACTIVITIES_EDIT, { ':idActivity': activity.id.toString() })}
    >
      <Edit2 size={18} />
    </LinkComponent>,
    <Button
      key="remove"
      color="custom"
      additionalClassName={styles["p-work-activities__btn-delete"]}
      onClick={() => openDeleteModalHdlr(activity)}
    >
      <Trash2 size={18} />
    </Button>,
    <LinkComponent
      key="details"
      color="custom"
      className={styles["p-work-activities__btn-details"]}
      to={rewriteRoute(ROUTES.WORK_ACTIVITIES_DETAILS, {':idActivity': activity.id.toString()})}
    >
      <Eye />
    </LinkComponent>,
  ]

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
        <Paginated<WorkActivity>
          useQueryHook={useWorkActivities}
          filterConfig={[
            {key: 'name', placeholder: '', label:t("table.filter.name")}
          ]}
        >
          {(res) =>  isCardView ? (
              <div className={styles["p-work-activities__grid"]}>
                {res.map((activity) => (
                  <DetailCard
                    key={activity.id}
                    header={<div>{activity.name}</div>}
                    body={<div>{activity.description || '-'}</div>}
                    actions={actions(activity)}
                  />
                ))}
              </div>
            ) : (
              <Table
                data={res}
                columns={[
                  { key: 'name', header: t('table.name') },
                  { key: 'description', header: t('table.description') },
                ]}
                actions={actions}
              />
            )
          }
        </Paginated>
      </Card>
    </div>
  );
};

export default WorkActivitiesList;