import type { Flurstueck, FlurstueckFormData } from '@/types/landeigentuemer';
import { createClient } from '@/utils/supabase/client';

export interface FlurstueckBrandenburg {
  fid: number;
  oid_: string;
  aktualit: string;
  idflurst: string;
  flaeche: number;
  flstkennz: string;
  land: string;
  landschl: string;
  gemarkung: string;
  gemaschl: string;
  flur: string;
  flurschl: string;
  flstnrzae: string;
  flstnrnen: string | null;
  regbezirk: string | null;
  regbezschl: string;
  kreis: string;
  kreisschl: string;
  gemeinde: string;
  gmdschl: string;
  abwrecht: string;
  lagebeztxt: string | null;
  tntext: string | null;
  flurstnr: string;
  geom_json?: Record<string, unknown>;
}

export const flurstueckeService = {
  // Alle Flurstücke eines Landeigentümers abrufen
  async getByLandeigentuemerId(landeigentuemerId: string): Promise<Flurstueck[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('flurstuecke')
      .select('*')
      .eq('landeigentuemer_id', landeigentuemerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Flurstueck[];
  },

  // Einzelnes Flurstück abrufen
  async getById(id: string): Promise<Flurstueck | null> {
    const supabase = createClient();
    const { data, error} = await supabase
      .from('flurstuecke')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Flurstueck | null;
  },

  /**
   * Sucht ein Flurstück in geodata.flurstueck_brandenburg anhand von Koordinaten
   */
  async searchByCoordinates(
    lat: number,
    lon: number
  ): Promise<FlurstueckBrandenburg | null> {
    const supabase = createClient();

    const { data, error } = await supabase.rpc('search_flurstueck_by_coordinates', {
      lat,
      lon,
    });

    if (error) {
      console.error('Error searching by coordinates:', error);
      throw error;
    }

    return data && data.length > 0 ? (data[0] as FlurstueckBrandenburg) : null;
  },

  /**
   * Sucht ein Flurstück in geodata.flurstueck_brandenburg anhand von Zähler und Nenner
   * Verwendet RPC-Funktion mit SECURITY DEFINER für kontrollierten Zugriff
   */
  async searchByZaehlerNenner(
    zaehler: string,
    nenner: string | null,
    gemarkung?: string
  ): Promise<FlurstueckBrandenburg[]> {
    const supabase = createClient();

    const { data, error } = await supabase.rpc('search_flurstueck_by_zaehler_nenner', {
      zaehler_param: zaehler,
      nenner_param: nenner,
      gemarkung_param: gemarkung || null,
    });

    if (error) {
      console.error('Error searching by Zähler/Nenner:', error);
      throw error;
    }

    return (data || []) as FlurstueckBrandenburg[];
  },

  /**
   * Ordnet ein Flurstück einem Landeigentümer zu
   */
  async assignToLandeigentuemer(
    landeigentuemerIdValue: string,
    flurstueckData: FlurstueckBrandenburg,
    bemerkungen?: string
  ): Promise<Flurstueck> {
    const supabase = createClient();

    const insertData = {
      landeigentuemer_id: landeigentuemerIdValue,
      fid: flurstueckData.fid,
      oid_: flurstueckData.oid_,
      flstkennz: flurstueckData.flstkennz,
      flstnrzae: flurstueckData.flstnrzae,
      flstnrnen: flurstueckData.flstnrnen,
      land: flurstueckData.land,
      landschl: flurstueckData.landschl,
      gemarkung: flurstueckData.gemarkung,
      gemaschl: flurstueckData.gemaschl,
      flur: flurstueckData.flur,
      flurschl: flurstueckData.flurschl,
      regbezirk: flurstueckData.regbezirk,
      regbezschl: flurstueckData.regbezschl,
      kreis: flurstueckData.kreis,
      kreisschl: flurstueckData.kreisschl,
      gemeinde: flurstueckData.gemeinde,
      gmdschl: flurstueckData.gmdschl,
      flaeche: flurstueckData.flaeche,
      lagebeztxt: flurstueckData.lagebeztxt,
      tntext: flurstueckData.tntext,
      aktualit: flurstueckData.aktualit,
      bemerkungen: bemerkungen || null,
    };

    const { data, error } = await supabase
      .from('flurstuecke')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error assigning Flurstück:', error);
      throw error;
    }

    return data as Flurstueck;
  },

  // Neues Flurstück erstellen (alte Methode für Kompatibilität)
  async create(landeigentuemerId: string, formData: FlurstueckFormData): Promise<Flurstueck> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('flurstuecke')
      .insert([{
        landeigentuemer_id: landeigentuemerId,
        ...formData,
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Flurstueck;
  },

  // Flurstück aktualisieren
  async update(id: string, formData: Partial<Flurstueck>): Promise<Flurstueck> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('flurstuecke')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Flurstueck;
  },

  /**
   * Aktualisiert die Bemerkungen eines Flurstücks
   */
  async updateBemerkungen(id: string, bemerkungen: string): Promise<Flurstueck> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('flurstuecke')
      .update({ bemerkungen })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating Flurstück:', error);
      throw error;
    }

    return data as Flurstueck;
  },

  // Flurstück löschen
  async delete(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('flurstuecke')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
