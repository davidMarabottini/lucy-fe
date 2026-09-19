import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useWorkScheduleTypes } from "@/hooks/api/WorkScheduleTypeHooks";
import styles from './List.module.scss'; 
import Table from "@/components/organisms/Table/Table";
import { type WorkScheduleType } from "@/api/types";
import { ROUTES } from "@/constants/routes";
import { Edit2, Eye, PlusCircle, Trash2, HelpCircle } from "lucide-react";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button/Button";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import * as Icons from "lucide-react";
import { rewriteRoute } from "@/utils/routes";
import Paginated from "@/components/organisms/Paginated/Paginated";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import { useViewStore } from "@/zustand/listViewAsCard";

const WorkScheduleTypeList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [curType, setCurType] = useState<WorkScheduleType | undefined>();

  const { t } = useTranslation("features/workScheduleType", { keyPrefix: "list" });

  const openDeleteModalHdlr = (type: WorkScheduleType) => {
    setCurType(type);
    setOpenModal(true);
  };

  const isCardView = useViewStore((state) => state.isCardView)

  const actions = (type: WorkScheduleType) => [
    <LinkComponent
      key="details"
      color="custom"
      className="t-btn-link"
      to={rewriteRoute(ROUTES.WORK_SCHEDULE_TYPE_DETAILS, {':idWorkScheduleType': type.id.toString()})}
    >
      <Eye />
    </LinkComponent>,
    <LinkComponent
      key="edit"
      color="custom"
      className="t-btn-link"
      to={rewriteRoute(ROUTES.WORK_SCHEDULE_TYPE_EDIT, { ':idWorkScheduleType': type.id.toString() })}
    >
      <Edit2 size={18} />
    </LinkComponent>,
    <Button
      key="remove"
      color="custom"
      additionalClassName="t-btn-link t-btn-delete"
      onClick={() => openDeleteModalHdlr(type)}
    >
      <Trash2 size={18} />
    </Button>,
  ]

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
        <Paginated<WorkScheduleType>
          area="work-schedule-types"
          useQueryHook={useWorkScheduleTypes}
          filterConfig={[
            { key: 'name', placeholder: '', label: t('table.name') }
          ]}
        >
          {(res) => {
            return isCardView ? (
              <div className={styles["p-wst__grid"]}>
                {res.map((type) => {
                  const Icon = (Icons as any)[type.icon_name] || HelpCircle;
                  return (
                    <DetailCard
                      key={type.id}
                      header={<div><Icon size={16} /> {type.name}</div>}
                      body={
                        <div>
                          <div>{t('table.period')}: {type.period !== 'NONE' ? t(`periods.${type.period}`) : t('periods.NONE')}</div>
                          <div>{t('table.frequency')}: {type.frequency ? `${type.frequency}x` : '-'}</div>
                          <div>{t('table.description')}: {type.description || '-'}</div>
                        </div>
                      }
                      actions={actions(type)}
                    />
                  );
                })}
              </div>
            ) : (
              <Table<WorkScheduleType>
                data={res}
                columns={[
                  {
                    key: 'icon_name',
                    header: '',
                    value: (row) => {
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
                actions={actions}
              />
            );
          }}
        </Paginated>
      </Card>
    </div>
  );
};

export default WorkScheduleTypeList;