// Enum für Organisationskategorien
export type OrganisationCategory = 'landeigentuemer' | 'vorhabenstraeger' | 'dienstleister';

export const ORGANISATION_CATEGORY_LABELS: Record<OrganisationCategory, string> = {
  landeigentuemer: 'Landeigentümer',
  vorhabenstraeger: 'Vorhabensträger',
  dienstleister: 'Dienstleister',
};

// Haupttabelle: Organisation
export interface Organisation {
  id: string;
  name: string;
  kurzname?: string;
  rechtsform?: string;
  kategorien: OrganisationCategory[];

  // Kontaktdaten
  email?: string;
  telefon?: string;
  website?: string;

  // Adresse
  strasse?: string;
  hausnummer?: string;
  plz?: string;
  ort?: string;
  land?: string;

  // Zusätzliche Infos
  steuernummer?: string;
  ust_id?: string;
  handelsregister?: string;

  // Notizen
  beschreibung?: string;
  notizen?: string;

  created_at: string;
  updated_at: string;
}

export interface OrganisationFormData {
  name: string;
  kurzname?: string;
  rechtsform?: string;
  kategorien: OrganisationCategory[];
  email?: string;
  telefon?: string;
  website?: string;
  strasse?: string;
  hausnummer?: string;
  plz?: string;
  ort?: string;
  land?: string;
  steuernummer?: string;
  ust_id?: string;
  handelsregister?: string;
  beschreibung?: string;
  notizen?: string;
}

// Kontaktperson (Mitarbeiter)
export interface OrganisationKontakt {
  id: string;
  organisation_id: string;
  anrede?: string;
  titel?: string;
  vorname: string;
  nachname: string;
  position?: string;
  abteilung?: string;
  email?: string;
  telefon?: string;
  mobil?: string;
  ist_hauptansprechpartner: boolean;
  ist_aktiv: boolean;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganisationKontaktFormData {
  anrede?: string;
  titel?: string;
  vorname: string;
  nachname: string;
  position?: string;
  abteilung?: string;
  email?: string;
  telefon?: string;
  mobil?: string;
  ist_hauptansprechpartner?: boolean;
  ist_aktiv?: boolean;
  notizen?: string;
}

// Flurstück (Plot)
export interface OrganisationPlot {
  id: string;
  organisation_id: string;
  fid?: number;
  oid_?: string;
  flstkennz?: string;
  flstnrzae?: string;
  flstnrnen?: string;
  land?: string;
  landschl?: string;
  gemarkung?: string;
  gemaschl?: string;
  flur?: string;
  flurschl?: string;
  regbezirk?: string;
  regbezschl?: string;
  kreis?: string;
  kreisschl?: string;
  gemeinde?: string;
  gmdschl?: string;
  flaeche?: number;
  lagebeztxt?: string;
  tntext?: string;
  aktualit?: string;
  erwerbsdatum?: string;
  kaufpreis?: number;
  grundbuchnummer?: string;
  bemerkungen?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganisationPlotFormData {
  fid?: number;
  flstkennz?: string;
  gemarkung?: string;
  flaeche?: number;
  erwerbsdatum?: string;
  kaufpreis?: number;
  grundbuchnummer?: string;
  bemerkungen?: string;
}

// Projekt (Project)
export interface OrganisationProject {
  id: string;
  organisation_id: string;
  projektname: string;
  projektnummer?: string;
  status: string;
  prioritaet: string;
  startdatum?: string;
  enddatum?: string;
  geplante_fertigstellung?: string;
  budget?: number;
  ausgaben?: number;
  projekttyp?: string;
  leistung_kwp?: number;
  standort_beschreibung?: string;
  plz?: string;
  ort?: string;
  projektleiter_kontakt_id?: string;
  beschreibung?: string;
  ziele?: string;
  risiken?: string;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganisationProjectFormData {
  projektname: string;
  projektnummer?: string;
  status?: string;
  prioritaet?: string;
  startdatum?: string;
  enddatum?: string;
  geplante_fertigstellung?: string;
  budget?: number;
  projekttyp?: string;
  leistung_kwp?: number;
  standort_beschreibung?: string;
  plz?: string;
  ort?: string;
  projektleiter_kontakt_id?: string;
  beschreibung?: string;
  ziele?: string;
  risiken?: string;
  notizen?: string;
}

// Dienstleistung (Service)
export interface OrganisationService {
  id: string;
  organisation_id: string;
  servicename: string;
  servicenummer?: string;
  kategorie?: string;
  beschreibung?: string;
  vertragsbeginn?: string;
  vertragsende?: string;
  vertragsart?: string;
  vertragswert?: number;
  zahlungsintervall?: string;
  naechste_zahlung?: string;
  status: string;
  projekt_id?: string;
  ansprechpartner_kontakt_id?: string;
  leistungsumfang?: string;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganisationServiceFormData {
  servicename: string;
  servicenummer?: string;
  kategorie?: string;
  beschreibung?: string;
  vertragsbeginn?: string;
  vertragsende?: string;
  vertragsart?: string;
  vertragswert?: number;
  zahlungsintervall?: string;
  status?: string;
  projekt_id?: string;
  ansprechpartner_kontakt_id?: string;
  leistungsumfang?: string;
  notizen?: string;
}

// Organisation mit allen verknüpften Daten
export interface OrganisationWithDetails extends Organisation {
  kontakte?: OrganisationKontakt[];
  plots?: OrganisationPlot[];
  projects?: OrganisationProject[];
  services?: OrganisationService[];

  // Statistiken
  anzahl_kontakte?: number;
  anzahl_plots?: number;
  anzahl_projects?: number;
  anzahl_services?: number;
}
