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
  flurstueck_nummer: string;
  gemarkung?: string;
  flaeche_qm?: number;
  nutzungsart?: string;
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
