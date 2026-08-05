import { Modal } from "@/components/atoms/Modal/Modal"
import Switch from "@/components/atoms/Switch/Switch";
import { useViewStore } from "@/zustand/listViewAsCard";
import { useOpenSettingsModal } from "@/zustand/openSettingsModal";
import { useTranslation } from "react-i18next";

const ModalSettings = () => {
  const openedSettings = useOpenSettingsModal(state => state.isOpenedSettings);
  const setOpenModal = useOpenSettingsModal(state => state.closeSettings);
  const { isCardView, toggleView } = useViewStore();
  const { t } = useTranslation("modalSettings");

  return (
    <Modal
      header={t("title")}
      open={openedSettings}
      setOpen={setOpenModal}
    >
      <Switch label={t("cardTableView")} onChange={toggleView} value={isCardView} />
    </Modal>
  )
}
export default ModalSettings;
