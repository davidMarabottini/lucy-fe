import apiClient from "./apiClient";

export interface LibemaxDipendente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  cellulare: string;
  codice_gestionale: string;
  note: string;
  archiviato: number;
  data_cessazione: string | null;
}

export interface LibemaxCliente {
  id?: number;
  nome?: string;
  indirizzo?: string;
  citta?: string;
  cap?: string;
  paese?: string;
  latitudine?: string;
  longitudine?: string;
  [key: string]: unknown;
}

export interface LibemaxTimbratura {
  id: number;
  ultima_modifica: string;
  ora_inizio: string;
  ora_inizio_arrotondata: string;
  ora_fine: string;
  ore: string;
  ore_arrotondate: string;
  pausa: string;
  ore_al_netto_della_pausa: string;
  ore_arrotondate_al_netto_della_pausa: string;
  ore_diurno: string;
  ore_notturno: string;
  ore_diurno_arrotondate: string;
  ore_notturno_arrotondate: string;
  latitudine_start: string;
  longitudine_start: string;
  indirizzo_start: string;
  cap_start: string;
  citta_start: string;
  provincia_start: string;
  stato_start: string;
  latitudine_end: string;
  longitudine_end: string;
  indirizzo_end: string;
  cap_end: string;
  citta_end: string;
  provincia_end: string;
  stato_end: string;
  ora_fine_arrotondata: string;
  tag_seriale_start: string;
  tag_testo_start: string;
  seriale_nfc_start: string;
  tag_seriale_stop: string;
  tag_testo_stop: string;
  codice_dispositivo: string;
  note: string;
  descrizione: string;
  cliente: LibemaxCliente;
  dipendente: LibemaxDipendente;
  attivita: unknown | null;
  foglio_intervento: string;
  allegati: unknown[];
  produttivita: unknown[];
  sblocco_timbratura: number;
  timbratura_confermata: number;
}

export type LibemaxTimbratureType = LibemaxTimbratura[];

// /api/libemax/timbrature?from=2024-05-12&to=2024-05-12
export const getLibemaxTimbrature = async (userId: number, date: string) => {
  const {data} = await apiClient.get(`/api/libemax/timbrature?user_id=${userId}&from=${date}&to=${date}`);
  return data;
};