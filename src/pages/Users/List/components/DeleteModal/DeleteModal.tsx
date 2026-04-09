import { useDeleteUser } from "@/hooks/api/useUserHooks";
import Table from "@/components/organisms/Table/Table";
import styles from "../../List.module.scss"
import type { UsersResult } from "@/api/userService";
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";

export const DeleteModal = ({openModal, setOpenModal, curUser}: DeleteModalProps) => {
  const {mutate: deleteUser} = useDeleteUser();
  const {t} = useTranslation("userList");
  const confirmDeleteUserHdlr = () => {
    if(curUser) {
      deleteUser(curUser.id);
    }
    setOpenModal(false);
  }

  const rejectDeleteUserHdlr = () => {
    setOpenModal(false);
  }
        
    return (<Modal
        header={t("modal.delete.header")}
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
        <div>{t("modal.delete.bodyQuestion")}</div>
        {curUser && (
          <Table<UsersResult>
            columns={[
              {key: 'name', header: t("modal.delete.bodyTable.name")},
              {key: 'surname', header: t("modal.delete.bodyTable.surname")},
              {key: 'email', header: t("modal.delete.bodyTable.email")},
              {key: 'username', header: t("modal.delete.bodyTable.username")},
              {key: 'roles', header: t("modal.delete.bodyTable.roles") },
              // render: (roles: string[]) => roles.join(", ")
            ]}
            data={[curUser]}
          />
        )}
      </Modal>)
}
