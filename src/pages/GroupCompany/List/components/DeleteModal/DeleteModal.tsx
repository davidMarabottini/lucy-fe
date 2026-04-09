import { useDeleteGroupCompany } from "@/hooks/api/GroupCompanyHooks";
import styles from "../../List.module.scss";
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";
import Table from "@/components/organisms/Table/Table";
import type { GroupCompany } from "@/api/groupCompanyService";

export const DeleteModal = ({ 
  openModal, 
  setOpenModal, 
  curGroupCompany 
}: DeleteModalProps) => {
  
  // Utilizziamo l'hook specifico per le compagnie
  const { mutate: deleteCompany } = useDeleteGroupCompany();
  
  // Namespace "groupCompany" con il prefisso corretto per la modale di eliminazione
  const { t } = useTranslation("groupCompany", { keyPrefix: "list.delete" });

  const confirmDeleteHdlr = () => {
    if (curGroupCompany) {
      deleteCompany(curGroupCompany.id);
    }
    setOpenModal(false);
  };

  const rejectDeleteHdlr = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      header={t("title")} // Mappato su "Elimina Società"
      open={openModal}
      setOpen={setOpenModal}
      btnList={[
        <Button
          key="confirm"
          color="custom"
          onClick={confirmDeleteHdlr}
          className={styles["p-company-list__modal-confirm-btn"]}
        >
          <Check size={18} />
        </Button>,
        <Button
          key="reject"
          color="custom"
          onClick={rejectDeleteHdlr}
          className={styles["p-company-list__modal-reject-btn"]}
        >
          <X size={18} />
        </Button>
      ]}
    >
      <div className="u-margin-bottom-md">{t("bodyQuestion")}</div>
      
      {curGroupCompany && (
        <Table<GroupCompany>
          columns={[
            { key: 'name', header: t("bodyTable.name") },
            { key: 'vat_number', header: t("bodyTable.vat_number") },
          ]}
          data={[curGroupCompany]}
        />
      )}
    </Modal>
  );
};