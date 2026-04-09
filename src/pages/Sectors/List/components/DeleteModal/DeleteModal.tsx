import { useDeleteSector } from "@/hooks/api/useSectors";
// import Table from "@/components/organisms/Table/Table";
import styles from "../../List.module.scss"
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";
import Table from "@/components/organisms/Table/Table";
import type { Sector } from "@/api/sectorService";

export const DeleteModal = ({openModal, setOpenModal, curSector}: DeleteModalProps) => {
  const {mutate: deleteSector} = useDeleteSector();
  const {t} = useTranslation("sector", {keyPrefix: "list.delete"});
  const confirmDeleteUserHdlr = () => {
    if(curSector) {
      deleteSector(curSector.id);
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
        <div>{t("bodyQuestion")}</div>
        {curSector && (
          <Table<Sector>
            columns={[
              {key: 'id', header: t("bodyTable.id")},
              {key: 'name', header: t("bodyTable.name")},
              {key: 'description', header: t("bodyTable.description")},
            ]}
            data={[curSector]}
          />
        )}
      </Modal>)
}
