import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import styles from './Home.module.scss';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("features/home");
  return (
    <Card additionalClassName={styles["p-home"]}>
      <Typography as="h2">
        {t("text")}
      </Typography>
    </Card>
  );
}
export default Home;