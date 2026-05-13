import Card from "@components/atoms/Card/Card";
import Typography from "@components/atoms/Typography/Typography";
import { useParams } from "react-router-dom";
import { useClientDetail } from "@/hooks/api/useClientHooks";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft } from "lucide-react"; // Map
import styles from './Details.module.scss'
import { useTranslation } from "react-i18next";

import clsx from "clsx";

import 'maplibre-gl/dist/maplibre-gl.css';
import { useLibemaxTimbrature } from "@/hooks/api/useLibemaxTimbratureHooks";
// import type { LibemaxTimbratureType } from "@/api/apiLibemaxTimbrature";
import ClientInfoCard from "./components/ClientInfoCard";
import { ContractsCard } from "./components/ContractsCard";
import { MapCard } from "./components/MapCard";

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { data, isLoading, error } = useClientDetail(Number(clientId));
  const {t} = useTranslation("client", {keyPrefix: "details"});
  const {data: mapData, isLoading: mapLoading, error: mapError} = useLibemaxTimbrature();

  const {cliente: clientLocation, dipendente } = mapData?.[0] || {};
  const dipendenti = Object.values(mapData?.reduce((acc: Record<string, any>, curr) => {
    const dip = curr.dipendente;
    if (dip && dip.id) {
      acc[dip.id] = dip;
    }
    return acc;
  }, {}) || {});

  console.log("dipendenti", dipendenti);
  const points = mapData?.flatMap(x => [{
    user: x.dipendente?.nome ? `${x.dipendente.nome} ${x.dipendente.cognome}` : '',
    latitudine: x.latitudine_start,
    longitudine: x.longitudine_start,
    indirizzo: x.indirizzo_start,
    cap: x.cap_start,
    citta: x.citta_start,
    provincia: x.provincia_start,
    stato: x.stato_start,
    orario: x.ora_inizio_arrotondata,
    type: 'start'
  }, {
    user: x.dipendente?.nome ? `${x.dipendente.nome} ${x.dipendente.cognome}` : '',
    latitudine: x.latitudine_end,
    longitudine: x.longitudine_end,
    indirizzo: x.indirizzo_end,
    cap: x.cap_end,
    citta: x.citta_end,
    provincia: x.provincia_end,
    stato: x.stato_end,
    orario: x.ora_fine_arrotondata,
    type: 'end'
  }]) || [];
  if (isLoading) return <div>{t("additionalMessage.loading")}</div>;
  if (error) return <div>{t("additionalMessage.errorLoading")}</div>;
  if(!data) {return ""}

  return (
    <div>
      <Card additionalClassName={clsx(styles["p-client-detail__card"], styles["p-client-detail__card-title"])}>
        <div className={styles["p-client-detail__card-title-internal"]}>
            <Typography variant="h2" additionalClasses={styles["p-client-detail__title"]}>
              {t("title")}
            </Typography>
            <LinkComponent to={ROUTES.LIBEMAX_CLIENTS}><ChevronLeft /></LinkComponent>
        </div>
      </Card>
      <ClientInfoCard client={data} />
      <ContractsCard clientId={clientId!} />
      <MapCard data={{clientLocation, mapLoading, mapData, mapError}} points={points} dipendente={dipendenti} />
    </div>
  );
};

export default ClientDetailPage;
