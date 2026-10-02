import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import styles from './Home.module.scss';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { routesBySection, ROUTE_SECTIONS } from "@/constants/routes";
import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { List, Minus, Plus, Sheet } from "lucide-react";
import { useCounts, useExportGeneralExcel, useWorkedHours } from "@/hooks/api/useHomeHooks";
import Button from "@/components/atoms/Button/Button";
import Table from "@/components/organisms/Table/Table";
import type { ClienteReport } from "@/api/types";
import RadioBtn from "@/components/atoms/RadioBtn/RadioBtn";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import MapContent from "@/components/molecules/MapContent/MapContent";

const Home = () => {
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const sections = routesBySection;
  const filteredRouteSections = Object.keys(routesBySection).filter(sectionKey => sectionKey !== ROUTE_SECTIONS.HOME && ![ROUTE_SECTIONS.AUTH, ROUTE_SECTIONS.SETTINGS, ROUTE_SECTIONS.ERRORS].includes(sectionKey));
  const { t: tMenu } = useTranslation("menu");
  const { data: counts } = useCounts();
  const { mutate: exportExcel } = useExportGeneralExcel();
  const { data: workedHours, isLoading: workedHoursLoading, error: workedHoursError, isFetched: workedHoursFetched } = useWorkedHours();

  const positives = (workedHours || []).filter(({ differenza_ore }) => differenza_ore > 0);
  const negatives = (workedHours || []).filter(({ differenza_ore }) => differenza_ore <= 0);
  const positivNegative = [
    { label: "Positive", value: "positives", Icon: Plus },
    { label: "Negative", value: "negatives", Icon: Minus }
  ];
  const [selectedPositiveNegative, setSelectedPositiveNegative] = useState(positivNegative[0].value);

  const curDataSet = selectedPositiveNegative === "negatives" ? negatives : positives;

  return (
    <>
    <Card additionalClassName={styles["p-home"]}>
      <div className={styles["p-home__grid"]}>
        {filteredRouteSections.map(sectionKey => (
          <DetailCard
            key={sectionKey}
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>{tMenu(sections[sectionKey]?.VIEW?.label || "")}</div>
                <div style={{ display: 'flex', gap: "8px" }}>
                  <LinkComponent to={sections[sectionKey]?.VIEW?.path || ""}>
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
    <Card additionalClassName={styles["p-home"]}>
      <RadioBtn
        name="map-graphic"
        options={positivNegative}
        defaultValue={positivNegative[0].value}
        onValueChange={(value) => setSelectedPositiveNegative(value)}
        className={classBase}
        gap="lg"
        {...iconPresetRest}
      />
        
      {workedHoursLoading && <Typography>Loading...</Typography>}
      {workedHoursError && <Typography>Error loading worked hours</Typography>}
      {workedHoursFetched && <Table<ClienteReport>
        columns={[
          {
            key: "cliente",
            header: "Cliente",
          },
          {
            key: "coordinate",
            header: "Coordinate",
            value : ({ coordinate }) => `${coordinate.lat}, ${coordinate.lng}`,
          },
          {
            key: "distanza_media_metri",
            header: "Distanza Media (metri)"
          },
          {
            key: "ore_lavorate",
            header: "Ore Lavorate"
          },
          {
            key: "ore_teoriche",
            header: "Ore Teoriche"
          },
          {
            key: "differenza_ore",
            header: "Differenza Ore"
          },
        ]}
        data={curDataSet.toSorted((a, b) => b.differenza_ore - a.differenza_ore)}
      />}
    </Card>
    <Card additionalClassName={styles["p-home"]}>
      <MapContent
        mapConfig={{
          mode: 'locations',
          locations: curDataSet.map(({ id, coordinate, label, distanza_media_metri }) => ({
            id,
            latitude: coordinate.lat,
            longitude: coordinate.lng,
            label,
            radiusInMeters: distanza_media_metri,
            PointPopup: () => (
            <div>
              ciao
              {/* <strong>{label}</strong> */}
              {/* <p>Raggio: {radiusInMeters}m</p> */}
            </div>
          )
          })),
          radiusInMeters: 300,
        }
        }
      />
    </Card>
    </>
  );
}
export default Home;