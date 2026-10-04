import Card from "@/components/ui/Card/Card";
import Typography from "@/components/ui/Typography/Typography";
import styles from './Home.module.scss';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { routesBySection, ROUTE_SECTIONS, ROUTES } from "@/constants/routes";
// import DetailCard from "@/components/atoms/DetailCard/DetailCard";
import LinkComponent from "@/components/ui/LinkComponent/LinkComponent";
import { Minus, Plus, Ruler } from "lucide-react";
import { useCounts, useExportGeneralExcel, useWorkedHours } from "@/hooks/api/useHomeHooks";
// import Button from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import type { ClienteReport } from "@/api/types";
import RadioBtn from "@/components/ui/RadioBtn/RadioBtn";
import { ICON_PRESET } from "@/components/ui/RadioBtn/presets/icon.presets";
import MapContent from "@/components/maps/MapContent/MapContent";
import { rewriteRoute } from "@/utils/routes";

const Home = () => {
  const {classBase, ...iconPresetRest} = ICON_PRESET;
  const sections = routesBySection;
  const filteredRouteSections = Object.keys(routesBySection).filter(sectionKey => sectionKey !== ROUTE_SECTIONS.HOME && ![ROUTE_SECTIONS.AUTH, ROUTE_SECTIONS.SETTINGS, ROUTE_SECTIONS.ERRORS].includes(sectionKey));
  const { t: tMenu } = useTranslation("menu");
  const { data: counts } = useCounts();
  const { mutate: exportExcel } = useExportGeneralExcel();
  const { data: workedHours, isLoading: workedHoursLoading, error: workedHoursError, isFetched: workedHoursFetched } = useWorkedHours();

  const positives = (workedHours || []).filter(({ differenza_ore }) => differenza_ore > 0).toSorted((a, b) => b.differenza_ore - a.differenza_ore);
  const negatives = (workedHours || []).filter(({ differenza_ore }) => differenza_ore <= 0).toSorted((a, b) => a.differenza_ore - b.differenza_ore);
  const distance = (workedHours || []).toSorted((a, b) => b.distanza_media_metri - a.distanza_media_metri);
  const positivNegative = [
    { label: "Positive", value: "positives", Icon: Plus },
    { label: "Negative", value: "negatives", Icon: Minus },
    { label: "Distance", value: "distance", Icon: Ruler }
  ];
  const [selectedPositiveNegative, setSelectedPositiveNegative] = useState(positivNegative[0].value);

  const curDataSet = selectedPositiveNegative === "negatives" ? negatives : selectedPositiveNegative === "distance" ? distance : positives;
  return (
    <>
    <Card additionalClassName={styles["p-home"]}>
      <Typography variant="h1">
        HOME
      </Typography>
    </Card>
    {/* <Card additionalClassName={styles["p-home"]}>
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
    </Card> */}
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
            value: ({ cliente, id_cliente }) => <LinkComponent to={rewriteRoute(ROUTES.CLIENT_DETAIL, { ':clientId': id_cliente })}>{cliente}</LinkComponent>,
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
        data={curDataSet}
      />}
    </Card>
    <Card additionalClassName={styles["p-home"]}>
      <MapContent
        mapConfig={{
          mode: 'locations',
          locations: curDataSet.map(({ id_cliente, cliente, coordinate, distanza_media_metri }) => ({
            id: id_cliente,
            latitude: coordinate.lat,
            longitude: coordinate.lng,
            label: cliente,
            radiusInMeters: distanza_media_metri,
          })),
          radiusInMeters: 300,
          renderPointPopup: (point) => {
            const report = curDataSet.find(({ id_cliente }) => id_cliente === point.id);
            if (!report) return null;
            return (
              <div>
                <strong>{report.cliente}</strong>
                <p style={{ fontWeight: 'normal' }}>Ore lavorate: {report.ore_lavorate}</p>
                <p style={{ fontWeight: 'normal' }}>Ore teoriche: {report.ore_teoriche}</p>
                <p style={{ fontWeight: 'normal' }}>Differenza: {report.differenza_ore}</p>
                <p style={{ fontWeight: 'normal' }}>Distanza media: {report.distanza_media_metri}m</p>
              </div>
            );
          },
        }}
      />
    </Card>
    </>
  );
}
export default Home;