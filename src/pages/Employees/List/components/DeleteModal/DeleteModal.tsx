import { useEmployeeDelete } from "@/hooks/api/useEmployeesHooks";
import Table from "@/components/organisms/Table/Table";
import styles from "../../List.module.scss"
import type { LibemaxEmployee } from "@/api/employeesService";
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";

export const DeleteModal = ({openModal, setOpenModal, curEmployee}: DeleteModalProps) => {
  const {mutate: deleteEmployee} = useEmployeeDelete();
  const {t} = useTranslation("employee", {keyPrefix: "list"});

  const confirmDeleteEmployeeHdlr = () => {
    if(curEmployee) {
      deleteEmployee(curEmployee.id);
    }
    setOpenModal(false);
  }

  const rejectDeleteEmployeeHdlr = () => {
    setOpenModal(false);
  }
        
    return (<Modal
        header={t("modal.delete.header")}
        open={openModal}
        setOpen={setOpenModal}
        btnList={[
          <Button
            color="custom"
            onClick={confirmDeleteEmployeeHdlr}
            className={styles["p-libemax-employees__modal-confirm-btn"]}
          >
            <Check />
          </Button>,
          <Button
            color="custom"
            onClick={rejectDeleteEmployeeHdlr}
            className={styles["p-libemax-employees__modal-reject-btn"]}
          >
            <X />
          </Button>
        ]}
      >
        <div>{t("modal.delete.bodyQuestion")}</div>
        {curEmployee && (
          <Table<LibemaxEmployee>
            columns={[
              {key: "id", header: t("modal.delete.bodyTable.id")},
              {key: "name", header: t("modal.delete.bodyTable.name")},
              {key: "surname", header: t("modal.delete.bodyTable.surname")},
              {key: "phone", header: t("modal.delete.bodyTable.phone")},
              {key: "email", header: t("modal.delete.bodyTable.email")}
            ]}
            data={[curEmployee]}
          />
        )}
      </Modal>)
}
