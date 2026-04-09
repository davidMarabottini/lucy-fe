import { useWorkActivityDelete } from "@/hooks/api/useWorkActivity";
import styles from "../../List.module.scss"
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";
import type { WorkActivity } from "@/api/workActivityService";
import Table from "@/components/organisms/Table/Table";

export const DeleteModal = ({openModal, setOpenModal, curWorkActivity: curWorkActivity}: DeleteModalProps) => {
  const {mutate: deleteWorkActivity} = useWorkActivityDelete();
  const {t} = useTranslation("workActivity", {keyPrefix: "list.delete"});
  const confirmDeleteUserHdlr = () => {
    if(curWorkActivity) {
      deleteWorkActivity(curWorkActivity.id);
    }
    setOpenModal(false);
  }

  const rejectDeleteUserHdlr = () => {
    setOpenModal(false);
  }
        
    return (<Modal
        header={t("header")}
        open={openModal}
        setOpen={setOpenModal}
        btnList={[
          <Button
            color="custom"
            onClick={confirmDeleteUserHdlr}
            className={styles["p-user-list__modal-confirm-btn"]}
          >
            <Check />
          </Button>,
          <Button
            color="custom"
            onClick={rejectDeleteUserHdlr}
            className={styles["p-user-list__modal-reject-btn"]}
          >
            <X />
          </Button>
        ]}
      >
        <div>{t("curWorkActivitybodyQuestion")}</div>
        {curWorkActivity && (
          <Table<WorkActivity>
            columns={[
              {key: 'name', header: t("curWorkActivitybodyTable.name")},
              {key: 'description', header: t("curWorkActivitybodyTable.description")},
            ]}
            data={[curWorkActivity]}
          />
        )}
      </Modal>)
}
