export interface Landeigentuemer {
  id: string;
  vorname: string;
  nachname: string;
  email?: string;
  telefon?: string;
  adresse?: string;
  ort?: string;
  plz?: string;
  notizen?: string;
  created_at: string;
  updated_at: string;
}

export interface LandeigentuemerFormData {
  vorname: string;
  nachname: string;
  email?: string;
  telefon?: string;
  adresse?: string;
  ort?: string;
  plz?: string;
  notizen?: string;
}

export interface Flurstueck {
  id: string;
  landeigentuemer_id: string;

  // Referenz zu geodata.flurstueck_brandenburg
  fid?: number;
  oid_?: string;

  // Flurstück-Identifikation
  flstkennz?: string;
  flstnrzae?: string; // Zähler
  flstnrnen?: string; // Nenner

  // Geografie
  land?: string;
  landschl?: string;
  gemarkung?: string;
  gemaschl?: string;
  flur?: string;
  flurschl?: string;

  // Verwaltung
  regbezirk?: string;
  regbezschl?: string;
  kreis?: string;
  kreisschl?: string;
  gemeinde?: string;
  gmdschl?: string;

  // Details
  flaeche?: number; // in qm
  lagebeztxt?: string;
  tntext?: string;
  aktualit?: string;

  // Custom
  bemerkungen?: string;

  created_at: string;
  updated_at: string;
}

export interface FlurstueckFormData {
  flurstueck_nummer: string;
  gemarkung?: string;
  flaeche_qm?: number;
  nutzungsart?: string;
  bemerkungen?: string;
}

export interface LandeigentuemerWithFlurstuecke extends Landeigentuemer {
  flurstuecke?: Flurstueck[];
}
