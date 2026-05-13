import Card from "@/components/atoms/Card/Card";
import { useTranslation } from "react-i18next";
import styles from "../Details.module.scss";
import Table from "@/components/organisms/Table/Table";
import MapContent from "@/components/molecules/MapContent/MapContent";

//TODO: tipizzare correttamente
export const MapCard = ({ data, points, dipendente}: { data?: any, points?: any[], dipendente?: any }) => {
  const {clientLocation, mapLoading, mapError} = data || {};
  const { t } = useTranslation("client", { keyPrefix: "details" });
  return (
    <Card  additionalClassName={styles["p-client-detail__card"]} >
      <strong>{t("dipendente")}</strong>
      <p>{dipendente?.nome} {dipendente?.cognome}</p>
      <p>{dipendente?.email}</p>
      <p>{dipendente?.telefono}</p>
      <Table data={points} columns={[
        {key: 'user', header: t('table.user')},
        {key: 'latitudine', header: t('table.latitudine')},
        {key: 'longitudine', header: t('table.longitudine')},
        {key: 'indirizzo', header: t('table.indirizzo')},
        {key: 'cap', header: t('table.cap')},
        {key: 'citta', header: t('table.citta')},
        {key: 'provincia', header: t('table.provincia')},
        {key: 'stato', header: t('table.stato')},
        {key: 'orario', header: t('table.orario')},
        {key: 'type', header: t('table.type')},
      ]} />
      <div style={{ height: '800px', marginTop: '20px' }}>
        {mapLoading && <div>{t("additionalMessage.loadingMap")}</div>}
        <MapContent
          headquarter={{
            id: 'client_location',
            latitude: parseFloat(clientLocation?.latitudine) || 0,
            longitude: parseFloat(clientLocation?.longitudine) || 0,
            label: clientLocation?.nome,
            description: `
              ${clientLocation?.nome || ''}
              ${clientLocation?.indirizzo || ''}
              ${clientLocation?.citta || ''} ${clientLocation?.cap || ''}
              ${clientLocation?.paese || ''}
            `
          }}
          clockIn={points.map((p, idx) => ({
            id: `point_${idx}`,
            latitude: parseFloat(p.latitudine) || 0,
            longitude: parseFloat(p.longitudine) || 0,
            label: p.indirizzo,
            description: `
              ${p.user || ''}
              ${p.indirizzo || ''}
              ${p.citta || ''} ${p.cap || ''}
              ${p.provincia || ''} ${p.stato || ''}
              ${p.type === 'start' ? 'Entrata' : 'Uscita'}
              ${p.orario ? `Timbratura ore ${p.orario}` : ''}
            `
          }))}
        />
        {mapError && <div>{t("additionalMessage.errorLoadingMap")}</div>}
      </div>
    </Card>
  )
}
