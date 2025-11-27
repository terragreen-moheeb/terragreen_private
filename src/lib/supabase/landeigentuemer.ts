import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Landeigentuemer, LandeigentuemerFormData, LandeigentuemerWithFlurstuecke } from '@/types/landeigentuemer';

const supabase = createClientComponentClient();

export const landeigentuemerService = {
  // Alle Landeigentümer abrufen
  async getAll(): Promise<Landeigentuemer[]> {
    const { data, error } = await supabase
      .from('landeigentuemer')
      .select('*')
      .order('nachname', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Einzelnen Landeigentümer mit Flurstücken abrufen
  async getById(id: string): Promise<LandeigentuemerWithFlurstuecke | null> {
    const { data, error } = await supabase
      .from('landeigentuemer')
      .select(`
        *,
        flurstuecke (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Neuen Landeigentümer erstellen
  async create(formData: LandeigentuemerFormData): Promise<Landeigentuemer> {
    const { data, error } = await supabase
      .from('landeigentuemer')
      .insert([formData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Landeigentümer aktualisieren
  async update(id: string, formData: LandeigentuemerFormData): Promise<Landeigentuemer> {
    const { data, error } = await supabase
      .from('landeigentuemer')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Landeigentümer löschen
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('landeigentuemer')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Suche nach Landeigentümern
  async search(query: string): Promise<Landeigentuemer[]> {
    const { data, error } = await supabase
      .from('landeigentuemer')
      .select('*')
      .or(`vorname.ilike.%${query}%,nachname.ilike.%${query}%,email.ilike.%${query}%`)
      .order('nachname', { ascending: true });

    if (error) throw error;
    return data || [];
  },
};
