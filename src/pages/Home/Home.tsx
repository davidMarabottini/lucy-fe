import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import styles from './Home.module.scss';

const Home = () => {
  return (
    <Card additionalClassName={styles["p-home"]}>
      <Typography as="h2">
        Benvenuto nella home page
      </Typography>
    </Card>
  );
}
export default Home;