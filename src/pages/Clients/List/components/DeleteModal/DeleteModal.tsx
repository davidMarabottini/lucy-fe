import { useClientDelete } from "@/hooks/api/useClientHooks";
import Table from "@/components/organisms/Table/Table";
import styles from "../../List.module.scss"
import type { LibemaxClient } from "@/api/clientService";
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";

export const DeleteModal = ({openModal, setOpenModal, curClient: idClient}: DeleteModalProps) => {
  const {mutate: deleteClient} = useClientDelete();
  const {t} = useTranslation("libemaxClient");
      const confirmDeleteClientHdlr = () => {
    if(idClient) {
      deleteClient(idClient.id);
    }
    setOpenModal(false);
  }

  const rejectDeleteClientHdlr = () => {
    setOpenModal(false);
  }
        
    return (<Modal
        header={t("modal.delete.header")}
        open={openModal}
        setOpen={setOpenModal}
        btnList={[
          <Button
            color="custom"
            onClick={confirmDeleteClientHdlr}
            className={styles["p-libemax-clients__modal-confirm-btn"]}
          >
            <Check />
          </Button>,
          <Button
            color="custom"
            onClick={rejectDeleteClientHdlr}
            className={styles["p-libemax-clients__modal-reject-btn"]}
          >
            <X />
          </Button>
        ]}
      >
        <div>{t("modal.delete.bodyQuestion")}</div>
        {idClient && (
          <Table<LibemaxClient>
            columns={[
              {key: "id", header: t("modal.delete.bodyTable.id")},
              {key: "name", header: t("modal.delete.bodyTable.name")},
              {key: "phone", header: t("modal.delete.bodyTable.phone")},
              {key: "email", header: t("modal.delete.bodyTable.email")}
            ]}
            data={[idClient]}
          />
        )}
      </Modal>)
}
