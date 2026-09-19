import Button from "@/components/atoms/Button/Button";
import { Modal } from "@/components/atoms/Modal/Modal"
import Switch from "@/components/atoms/Switch/Switch";
import Table from "@/components/organisms/Table/Table";
import { useViewStore } from "@/zustand/listViewAsCard";
import { useOpenSettingsModal } from "@/zustand/openSettingsModal";
import { usePaginationStore } from "@/zustand/usePaginationStore";
import { useTranslation } from "react-i18next";
import styles from "./ModalSettings.module.scss";
import Typography from "@/components/atoms/Typography/Typography";

const ModalSettings = () => {
  const openedSettings = useOpenSettingsModal(state => state.isOpenedSettings);
  const setOpenModal = useOpenSettingsModal(state => state.closeSettings);
  const { isCardView, toggleView } = useViewStore();
  const { t } = useTranslation("modalSettings");
  const { lists, resetList } = usePaginationStore();
  const listRemapped = Object.keys(lists).map(x => ({ key: x, filters: lists[x].filters, page: lists[x].page }));
  console.log('davidlog lista', listRemapped);

  return (
    <Modal
      header={t("title")}
      open={openedSettings}
      setOpen={setOpenModal}
    >
      <div className={styles["c-modal-settings__section"]}>
        <Typography as="h2" variant="h2" className={styles["c-modal-settings__subtitle"]}>{t("viewOpts")}</Typography>
        <Switch label={t("cardTableView")} onChange={toggleView} value={isCardView} />
      </div>
      {listRemapped.length > 0 && <div className={styles["c-modal-settings__section"]}>
        <Typography as="h2" variant="h2" className={styles["c-modal-settings__subtitle"]}>{t("lists")}</Typography>
        <Table
          data={listRemapped}
          columns={[
            { key: 'key', header: t("key")},
            { key: 'filters', header: t("filters"), value: (row) => JSON.stringify(row.filters)},
            { key: 'page', header: t("page")}
          ]}
          actions={row => [<Button onClick={() => resetList(row.key)}>{t("reset")}</Button>]}
        />
        <div className={styles["c-modal-settings__button-container"]}>
          <Button
            onClick={() => listRemapped.forEach(row => resetList(row.key))}
            disabled={listRemapped.length === 0}
          >{t("reset_all")}</Button>
        </div>
      </div>}
    </Modal>
  )
}
export default ModalSettings;
