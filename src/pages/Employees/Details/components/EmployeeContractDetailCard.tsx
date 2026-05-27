import Card from "@/components/atoms/Card/Card";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";
import detailStyles from "../Details.module.scss";
import { useEmployeeDetailStore } from "@/zustand/employeeDetailState";
import { ContractSchedulesTable } from "@/pages/Clients/Details/components/ContractSchedulesTable";
import Button from "@/components/atoms/Button/Button";
import { Map as MapIcon, TriangleAlert, X } from "lucide-react";
import Table from "@/components/organisms/Table/Table";
import MapContent from "@/components/molecules/MapContent/MapContent";
import { useLibemaxTimbrature } from "@/hooks/api/useLibemaxTimbratureHooks";
import type { ClockInPoint } from "@/components/molecules/MapContent/MapContent.types";
import { useState } from "react";
import { calculateDistance } from "@/utils/calculateDistance";
import 'maplibre-gl/dist/maplibre-gl.css';

interface EmployeeContractDetailCardProps {
  employeeLibemaxId: number;
}

export const EmployeeContractDetailCard = ({ employeeLibemaxId }: EmployeeContractDetailCardProps) => {
  const { t } = useTranslation("employee", { keyPrefix: "details.contractDetail" });
  const selectedContractId = useEmployeeDetailStore((s) => s.selectedContractId);
  const selectedDate = useEmployeeDetailStore((s) => s.selectedDate);
  const setSelectedContractId = useEmployeeDetailStore((s) => s.setSelectedContractId);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const { data: rawMapData, isLoading: mapLoading, error: mapError } = useLibemaxTimbrature(employeeLibemaxId, selectedDate, !!selectedContractId);

  if (!selectedContractId) return null;

  const { cliente: clientLocation } = rawMapData?.[0] || {};

  const points = rawMapData?.flatMap(x => [{
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
  }]) ?? [];

  return (
    <Card additionalClassName={detailStyles["p-employee-detail__card"]}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
        <Typography variant="h2" additionalClasses={detailStyles["p-employee-detail__title"]}>
          {t("schedules.subtitle")}
        </Typography>
        <Button color="custom" onClick={() => setSelectedContractId(null)}>
          <X size={18} />
        </Button>
      </div>

      <ContractSchedulesTable contractId={selectedContractId} selectedDate={selectedDate} />

      <Typography variant="h2" additionalClasses={detailStyles["p-employee-detail__title"]} style={{ marginTop: 'var(--space-lg)' }}>
        {t("timbrature.subtitle")}
      </Typography>

      <Table
        data={points}
        columns={[
          { key: 'user', header: t('timbrature.table.user') },
          { key: 'indirizzo', header: t('timbrature.table.indirizzo') },
          { key: 'cap', header: t('timbrature.table.cap') },
          { key: 'citta', header: t('timbrature.table.citta') },
          { key: 'provincia', header: t('timbrature.table.provincia') },
          { key: 'stato', header: t('timbrature.table.stato') },
          { key: 'orario', header: t('timbrature.table.orario') },
          {
            key: '__distance',
            header: t('timbrature.table.distance'),
            value: (row) => {
              const lat1 = Number(row.latitudine);
              const lon1 = Number(row.longitudine);
              const lat2 = Number(clientLocation?.latitudine ?? NaN);
              const lon2 = Number(clientLocation?.longitudine ?? NaN);

              if (!Number.isFinite(lat1) || !Number.isFinite(lon1) || !Number.isFinite(lat2) || !Number.isFinite(lon2)) {
                return '-';
              }

              const distance = calculateDistance([lat1, lon1], [lat2, lon2]);
              return distance && distance.result && distance.result !== 'NaN m'
                ? <div style={{ display: 'flex', gap: '8px', background: distance.unit === 'km' ? 'yellow' : 'transparent' }}>
                    {distance.result}{distance.unit === 'km' ? <TriangleAlert size={20} /> : ''}
                  </div>
                : '-';
            },
          },
          { key: 'type', header: t('timbrature.table.type') },
        ]}
        getRowKey={({ id }) => id}
        actions={[
          row => <Button color="custom" onClick={() => setSelectedPoint(row.id)}><MapIcon /></Button>
        ]}
      />

      <div style={{ height: '800px', marginTop: '20px' }}>
        {mapLoading && <div>{t("timbrature.loadingMap")}</div>}
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
        {mapError && <div>{t("timbrature.errorLoadingMap")}</div>}
      </div>
    </Card>
  );
};
