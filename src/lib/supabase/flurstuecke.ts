import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Flurstueck, FlurstueckFormData } from '@/types/landeigentuemer';

const supabase = createClientComponentClient();

export const flurstueckeService = {
  // Alle Flurstücke eines Landeigentümers abrufen
  async getByLandeigentuemerId(landeigentuemerId: string): Promise<Flurstueck[]> {
    const { data, error } = await supabase
      .from('flurstuecke')
      .select('*')
      .eq('landeigentuemer_id', landeigentuemerId)
      .order('flurstueck_nummer', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Einzelnes Flurstück abrufen
  async getById(id: string): Promise<Flurstueck | null> {
    const { data, error } = await supabase
      .from('flurstuecke')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Neues Flurstück erstellen
  async create(landeigentuemerId: string, formData: FlurstueckFormData): Promise<Flurstueck> {
    const { data, error } = await supabase
      .from('flurstuecke')
      .insert([{
        landeigentuemer_id: landeigentuemerId,
        ...formData,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Flurstück aktualisieren
  async update(id: string, formData: FlurstueckFormData): Promise<Flurstueck> {
    const { data, error } = await supabase
      .from('flurstuecke')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Flurstück löschen
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('flurstuecke')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
