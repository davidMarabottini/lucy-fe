import Card from "@/components/atoms/Card/Card";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import Table from "@/components/organisms/Table/Table";
import MapContent from "@/components/molecules/MapContent/MapContent";
import { useLibemaxTimbrature } from "@/hooks/api/useLibemaxTimbratureHooks";
import type { ClockInPoint } from "@/components/molecules/MapContent/MapContent.types";
import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { Map, TriangleAlert } from "lucide-react";
import { calculateDistance } from "@/utils/calculateDistance";
import 'maplibre-gl/dist/maplibre-gl.css';
import Typography from "@/components/atoms/Typography/Typography";
import { useClientDetailStore } from "@/zustand/clientDetailState";

export const MapCard = ({clientId}: {clientId: string}) => {
  const selectedDate = useClientDetailStore((s) => s.selectedDate);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const {data: mapData, isLoading: mapLoading, error: mapError} = useLibemaxTimbrature(Number(clientId), selectedDate);

  const {cliente: clientLocation } = mapData?.[0] || {};
  const dipendente = Object.values(mapData?.reduce((acc: Record<string, any>, curr) => {
    const dip = curr.dipendente;
    if (dip && dip.id) {
      acc[dip.id] = dip;
    }
    return acc;
  }, {}) || {});

  const points = mapData?.flatMap(x => [{
    id: `start_${x.id}`,
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
    id: `end_${x.id}`,
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

  const { t } = useTranslation("client", { keyPrefix: "details.workDetails" });
  return (
    <Card  additionalClassName={styles["p-client-detail__card"]} >
      <Typography variant="h2" additionalClasses={styles["p-client-detail__title"]}>
        {t("subtitle")}
      </Typography>
      {dipendente?.map((d, idx) => (
        <div key={idx}>
          <strong>{t("dipendente")}</strong>
          <p>{d?.nome} {d?.cognome}</p>
          <p>{d?.email}</p>
          <p>{d?.telefono}</p>
        </div>
      ))}
      <Table
        data={points}
        columns={[
          {key: 'user', header: t('table.user')},
          {key: 'latitudine', header: t('table.latitudine')},
          {key: 'longitudine', header: t('table.longitudine')},
          {key: 'indirizzo', header: t('table.indirizzo')},
          {key: 'cap', header: t('table.cap')},
          {key: 'citta', header: t('table.citta')},
          {key: 'provincia', header: t('table.provincia')},
          {key: 'stato', header: t('table.stato')},
          {key: 'orario', header: t('table.orario')},
          {
            key: '__distance',
            header: t('table.distance'),
            value: (row) => {
              const distance = calculateDistance([row.latitudine, row.longitudine], [clientLocation?.latitudine, clientLocation?.longitudine]);
              return distance ? <div style={{ display: 'flex', gap: '8px', background: distance.endsWith('km') ? 'yellow' : 'transparent' }}>{distance}{distance.endsWith('km') ? <TriangleAlert fontSize={20} /> : ''}</div> : '-';
            },
            
          },
          {key: 'type', header: t('table.type')},
        ]}
        actions={[
          row => <Button color="custom" onClick={() => setSelectedPoint(row.id)}><Map /></Button>
        ]}
      />
      <div style={{ height: '800px', marginTop: '20px' }}>
        {mapLoading && <div>{t("additionalMessage.loadingMap")}</div>}
        <MapContent
          headquarter={{
            id: 'client_location',
            latitude: Number.parseFloat(clientLocation?.latitudine || '0'),
            longitude: Number.parseFloat(clientLocation?.longitudine || '0'),
            label: clientLocation?.nome,
            description: `
              ${clientLocation?.nome || ''}
              ${clientLocation?.indirizzo || ''}
              ${clientLocation?.citta || ''} ${clientLocation?.cap || ''}
            `
          }}
          clockIn={
            points.map((p) => ({
              id: p.id,
              latitude: Number.parseFloat(p.latitudine) || 0,
              longitude: Number.parseFloat(p.longitudine) || 0,
              label: p.indirizzo,
              description: `
                ${p.user || ''}
                ${p.indirizzo || ''}
                ${p.citta || ''} ${p.cap || ''}
                ${p.provincia || ''} ${p.stato || ''}
                ${p.type === 'start' ? 'Entrata' : 'Uscita'}
                ${p.orario ? `Timbratura ore ${p.orario}` : ''}
              `
            })) as ClockInPoint[]
          }
          focusedPointId={selectedPoint}
        />
        {mapError && <div>{t("additionalMessage.errorLoadingMap")}</div>}
      </div>
    </Card>
  )
}
