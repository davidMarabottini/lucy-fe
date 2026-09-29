import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import styles from './Home.module.scss';
import { useTranslation } from "react-i18next";
import { routesBySection, ROUTE_SECTIONS } from "@/constants/routes";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { List, Plus, Sheet } from "lucide-react";
import { useCounts, useExportGeneralExcel } from "@/hooks/api/useHomeHooks";
import Button from "@/components/atoms/Button/Button";

const Home = () => {
  const sections = routesBySection;
  const filteredRouteSections = Object.keys(routesBySection).filter(sectionKey => sectionKey !== ROUTE_SECTIONS.HOME && sectionKey !== ROUTE_SECTIONS.AUTH && sectionKey !== ROUTE_SECTIONS.SETTINGS);
  const { t: tMenu } = useTranslation("menu");
  const { data: counts } = useCounts();
  const { mutate: exportExcel } = useExportGeneralExcel();
  return (
    <Card additionalClassName={styles["p-home"]}>
      <div className={styles["p-home__grid"]}>
        {filteredRouteSections.map(sectionKey => (
          <DetailCard
            key={sectionKey}
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>{tMenu(sections[sectionKey]?.VIEW?.label || "")}</div>
                <div style={{ display: 'flex', gap: "8px" }}>
                   <LinkComponent
                  to={sections[sectionKey]?.VIEW?.path || ""}
                >
                  <List />
                </LinkComponent>
                <LinkComponent
                  to={sections[sectionKey]?.INSERT?.path || ""}
                >
                  <Plus />
                </LinkComponent>
                
                </div>
              </div>
            }
            body={
              <div style={{ display: 'flex', gap: "4px" }}>
                {counts && counts[sectionKey] !== undefined ? (
                  <Typography>Totale righe: {counts[sectionKey]}</Typography>
                ) : (
                  <Typography>Totale righe: 0</Typography>
                )}
              </div>
            }
           actions={[
            <Button
              onClick={() => exportExcel(sectionKey)}
              color="success"
              variant="outline"
            >
                 <Sheet />
               </Button>]}
           actionDirection="reverse"
          />
        ))}
      </div>
    </Card>
  );
}
export default Home;