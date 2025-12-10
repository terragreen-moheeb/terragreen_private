import { createClient } from '@/utils/supabase/client';
import type { Landeigentuemer, LandeigentuemerFormData, LandeigentuemerWithFlurstuecke } from '@/types/landeigentuemer';

export const landeigentuemerService = {
  // Alle Landeigentümer abrufen
  async getAll(): Promise<Landeigentuemer[]> {
    const supabase = createClient();
    console.log('Supabase Client erstellt, starte Abfrage...');

    // Timeout-Promise
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query Timeout nach 10 Sekunden')), 10000)
    );

    // Query-Promise
    const queryPromise = supabase
      .from('landeigentuemer')
      .select('*')
      .order('nachname', { ascending: true });

    // Race zwischen Query und Timeout
    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error) {
      console.error('Supabase Fehler:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      throw new Error(`Datenbankfehler: ${error.message} (Code: ${error.code})`);
    }

    console.log('Daten erfolgreich abgerufen:', data);
    return (data || []) as Landeigentuemer[];
  },

  // Einzelnen Landeigentümer mit Flurstücken abrufen
  async getById(id: string): Promise<LandeigentuemerWithFlurstuecke | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('landeigentuemer')
      .select(`
        *,
        flurstuecke (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as LandeigentuemerWithFlurstuecke | null;
  },

  // Neuen Landeigentümer erstellen
  async create(formData: LandeigentuemerFormData): Promise<Landeigentuemer> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('landeigentuemer')
      .insert([formData])
      .select()
      .single();

    if (error) throw error;
    return data as Landeigentuemer;
  },

  // Landeigentümer aktualisieren
  async update(id: string, formData: LandeigentuemerFormData): Promise<Landeigentuemer> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('landeigentuemer')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Landeigentuemer;
  },

  // Landeigentümer löschen
  async delete(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('landeigentuemer')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Suche nach Landeigentümern
  async search(query: string): Promise<Landeigentuemer[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('landeigentuemer')
      .select('*')
      .or(`vorname.ilike.%${query}%,nachname.ilike.%${query}%,email.ilike.%${query}%`)
      .order('nachname', { ascending: true });

    if (error) throw error;
    return (data || []) as Landeigentuemer[];
  },
};
