/**
 * Centralized API types — single source of truth for all API-related interfaces and types.
 * Import from here instead of individual service files.
 */

import type { AvailableDomainsType, AvailableRolesType, AvailableStatusesType } from "@/types/contentsFormDatas.types";

// ─── Domains ─────────────────────────────────────────────────────────────────

export type DomainType = {
  id: number;
  name: AvailableDomainsType;
  description: string | null;
};

// ─── Libemax Integration ─────────────────────────────────────────────────────

export type LibemaxUser = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  theoretical_hours?: number | null;
  total_hours?: number | null;
};

export type MissingClockin = {
  id: number;
  name: string;
  expected_time: string;
  phone?: string;
  delay: number;
};

export type RemoteClockin = {
  id: number;
  name: string;
  time: string;
  location: string;
  phone?: string;
  theoretical_hours?: number | null;
  distance: number;
};

// ─── Libemax Timbrature ───────────────────────────────────────────────────────

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
  archiviato?: number;
  cap?: string;
  citta?: string;
  codice_gestionale?: string;
  contatto?: {
    cellulare?: string;
    email?: string;
    id?: number;
    nome?: string;
    cognome?: string;
    telefono?: string;
    ruolo?: string;
  };
  email?: string;
  id?: number;
  indirizzo?: string;
  latitudine?: string;
  longitudine?: string;
  nome?: string;
  note?: string;
  piva?: string;
  provincia?: string;
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

// ─── Sectors ─────────────────────────────────────────────────────────────────

export interface Sector {
  id: number;
  name: string;
  description?: string;
}

export type SectorPayload = Omit<Sector, "id">;

// ─── Group Company ────────────────────────────────────────────────────────────

export interface GroupCompany {
  id: number;
  name: string;
  vat_number: string;
  sectors: Sector[];
}

export interface GroupCompanyPayload {
  name: string;
  vat_number: string;
  sector_ids: number[];
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export type LibemaxClient = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type LibemaxClientDetail = {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: number | null;
  schedule?: string | null;
};

export type LibemaxAddClient = {
  name: string;
  email: string;
  phone: string;
  domain_id: number;
};

// ─── Employees ───────────────────────────────────────────────────────────────

export type LibemaxEmployee = {
  id: number;
  libemax_id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
};

export type LibemaxAddEmployee = Omit<LibemaxEmployee, "id">;

// ─── Contracts ───────────────────────────────────────────────────────────────

export interface Contract {
  client: LibemaxClient;
  contract_code: string;
  description: string;
  end_date: string;
  id: number;
  provider: GroupCompany;
  start_date: string;
}

export type ContractPayload = Omit<Contract, "id">;

/** Assignment of an employee to a contract (used by both contract and employee services). */
export interface ContractEmployeeAssignment {
  assignment_id: number;
  employee: LibemaxEmployee;
  end_date: string | null;
  start_date: string;
}

/** @deprecated Use `ContractEmployeeAssignment` instead. */
export type EmployeeContractAssignment = ContractEmployeeAssignment;

// ─── Users ───────────────────────────────────────────────────────────────────

export interface RegistrationResult {
  status: AvailableStatusesType;
  id: number;
  message: string;
}

export interface UserStatusResult {
  user: {
    level: number;
    nextLevelProgress: number;
    rank: string;
  };
  contributions: {
    mail: { ham: number; spam: number };
    sms: { ham: number; spam: number };
  };
  privileges: string[];
  badges: { id: number; name: string; iconName: string }[];
}

export interface UsersResult {
  email: string;
  id: number;
  name: string;
  roles: AvailableRolesType[];
  surname: string;
  username: string;
}

// ─── Week Days ────────────────────────────────────────────────────────────────

export interface WeekDay {
  id: number;
  name: string;
  order: number;
}

// ─── Work Activities ──────────────────────────────────────────────────────────

export type WorkActivity = {
  id: number;
  name: string;
  description: string;
};

export type WorkActivityAdd = {
  name: string;
  description: string;
};

// ─── Work Schedule Types ──────────────────────────────────────────────────────

export type PeriodType = "DAY" | "WEEK" | "MONTH" | "YEAR" | "FIXED" | "NONE";

export interface WorkScheduleType {
  id: number;
  name: string;
  description?: string;
  frequency?: number;
  period: PeriodType;
  icon_name: string;
}

export type WorkScheduleTypePayload = Omit<WorkScheduleType, "id">;

// ─── Work Schedules ───────────────────────────────────────────────────────────

export type WorkSchedule = {
  id: number;
  user_id?: number | null;
  client_id?: number | null;
  contract_id?: number | null;
  schedule_type_id: number;
  week_day_id?: number | null;
  start_time?: string | null;
  end_time?: string | null;
  weekly_hours?: number | null;
  note?: string | null;
  work_activity_id?: number | null;
  week_day?: Pick<WeekDay, "id" | "name"> | null;
  work_activity?: Pick<WorkActivity, "id" | "name"> | null;
  schedule_type?: WorkScheduleType | null;
};

export type WorkScheduleAdd = Omit<WorkSchedule, "id" | "week_day" | "work_activity" | "schedule_type">;
