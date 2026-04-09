import { useDeleteContract } from "@/hooks/api/ContractHooks";
import styles from "../../List.module.scss";
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";
import Table from "@/components/organisms/Table/Table";
import type { Contract } from "@/api/contractService";

export const DeleteModal = ({ 
  openModal, 
  setOpenModal, 
  curContract 
}: DeleteModalProps) => {
  
  // Utilizziamo l'hook specifico per le compagnie
  const { mutate: deleteContract } = useDeleteContract();
  
  // Namespace "groupCompany" con il prefisso corretto per la modale di eliminazione
  const { t } = useTranslation("contract", { keyPrefix: "list.delete" });

  const confirmDeleteHdlr = () => {
    if (curContract) {
      deleteContract(curContract.id);
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
      
      {curContract && (
        <Table<Contract>
          columns={[
            { key: 'contract_code', header: t('bodyTable.contract_code') },
            { key: 'provider', header: t('bodyTable.provider'), value: (row) => row.provider ? row.provider.name : '-' },
            { key: 'client', header: t('bodyTable.client'), value: (row) => row.client ? row.client.name : '-' },
            { key: 'start_date', header: t('bodyTable.start_date'), value: (row) => row.start_date ? new Date(row.start_date).toLocaleDateString('it-IT') : '-' },
            { key: 'end_date', header: t('bodyTable.end_date'), value: (row) => row.end_date ? new Date(row.end_date).toLocaleDateString('it-IT') : '-' },
          ]}
          data={[curContract]}
        />
      )}
    </Modal>
  );
};