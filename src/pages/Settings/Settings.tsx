import Card from "@/components/atoms/Card/Card";
// import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import Switch from "@/components/atoms/Switch/Switch";
import Typography from "@/components/atoms/Typography/Typography";
import { useViewStore } from "@/zustand/listViewAsCard";
// import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./Settings.module.scss";

const Settings = () => {
  const { isCardView, toggleView } = useViewStore();
  const { t } = useTranslation("settings", { keyPrefix: "list" });
  return(
    <>
      <Card additionalClassName={styles["p-settings"]}>
        <div className={styles["p-settings"]}>
            <Typography variant="h2" additionalClasses={styles["p-settings__title"]}>
              {t("title")}
            </Typography>
            {/* <LinkComponent to={-1}>
              <X size={24} />
            </LinkComponent> */}
        </div>
      </Card>
      <Card additionalClassName="p-settings">
        <Switch label="Visualizza come Card" onChange={toggleView} value={isCardView} />
      </Card>
    </>
  );
}

export default Settings;