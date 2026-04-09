import { useDeleteWorkScheduleType } from "@/hooks/api/WorkScheduleTypeHooks";
import styles from "../../List.module.scss";
import { Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/Modal/Modal";
import Button from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import type { DeleteModalProps } from "./DeleteModal.types";
import Table from "@/components/organisms/Table/Table";
import type { WorkScheduleType } from "@/api/workScheduleTypeService";

export const DeleteModal = ({ 
  openModal, 
  setOpenModal, 
  curType 
}: DeleteModalProps) => {
  
  // Utilizziamo l'hook specifico per le compagnie
  const { mutate: deleteWorkScheduleType } = useDeleteWorkScheduleType();
  
  // Namespace "groupCompany" con il prefisso corretto per la modale di eliminazione
  const { t } = useTranslation("workScheduleType", { keyPrefix: "list.delete" });

  const confirmDeleteHdlr = () => {
    if (curType) {
      deleteWorkScheduleType(curType.id);
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
      
      {curType && (
        <Table<WorkScheduleType>
          columns={[
            { key: 'name', header: t('bodyTable.name') },
            { key: 'period', header: t('bodyTable.period'), value: (row) => row.period !== 'NONE' ? t(`periods.${row.period}`) : t('periods.NONE') },
            { key: 'frequency', header: t('bodyTable.frequency'), value: (row) => row.frequency ? `${row.frequency}x` : '-' },
            { key: 'description', header: t('bodyTable.description'), value: (row) => row.description || '-' },
          ]}
          data={[curType]}
        />
      )}
    </Modal>
  );
};
