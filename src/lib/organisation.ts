import { createClient } from '@/utils/supabase/client';
import type {
  Organisation,
  OrganisationFormData,
  OrganisationWithDetails,
  OrganisationKontakt,
  OrganisationKontaktFormData,
  OrganisationPlot,
  OrganisationPlotFormData,
  OrganisationProject,
  OrganisationProjectFormData,
  OrganisationService,
  OrganisationServiceFormData,
} from '@/types/organisation';

export const organisationService = {
  // ==================== ORGANISATIONS ====================

  // Alle Organisationen abrufen (mit Statistiken)
  async getAll(): Promise<OrganisationWithDetails[]> {
    const supabase = createClient();

    // Timeout-Promise
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query Timeout nach 10 Sekunden')), 10000)
    );

    // Query-Promise
    const queryPromise = supabase
      .from('organisations')
      .select('*')
      .order('name', { ascending: true });

    // Race zwischen Query und Timeout
    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error) {
      console.error('organisationService Supabase Fehler:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      throw new Error(`Datenbankfehler: ${error.message} (Code: ${error.code})`);
    }


    // Counts separat laden wäre effizienter, aber für jetzt erstmal ohne
    return (data || []).map((org: any) => ({
      ...org,
      anzahl_kontakte: 0,
      anzahl_plots: 0,
      anzahl_projects: 0,
      anzahl_services: 0,
    })) as OrganisationWithDetails[];
  },

  // Einzelne Organisation mit allen Details abrufen
  async getById(id: string): Promise<OrganisationWithDetails | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisations')
      .select(`
        *,
        kontakte:organisation_kontakte(*),
        plots:organisation_plots(*),
        projects:organisation_projects(*),
        services:organisation_services(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationWithDetails | null;
  },

  // Neue Organisation erstellen
  async create(formData: OrganisationFormData): Promise<Organisation> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisations')
      .insert([formData])
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as Organisation;
  },

  // Organisation aktualisieren
  async update(id: string, formData: OrganisationFormData): Promise<Organisation> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisations')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as Organisation;
  },

  // Organisation löschen
  async delete(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('organisations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }
  },

  // Suche nach Organisationen
  async search(query: string): Promise<Organisation[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisations')
      .select('*')
      .or(`name.ilike.%${query}%,kurzname.ilike.%${query}%,email.ilike.%${query}%`)
      .order('name', { ascending: true });

    if (error) {
      console.error('organisationService Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return (data || []) as Organisation[];
  },

  // ==================== KONTAKTE ====================

  // Alle Kontakte einer Organisation
  async getKontakte(organisationId: string): Promise<OrganisationKontakt[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_kontakte')
      .select('*')
      .eq('organisation_id', organisationId)
      .order('nachname', { ascending: true });

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return (data || []) as OrganisationKontakt[];
  },

  // Kontakt erstellen
  async createKontakt(organisationId: string, formData: OrganisationKontaktFormData): Promise<OrganisationKontakt> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_kontakte')
      .insert([{ ...formData, organisation_id: organisationId }])
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationKontakt;
  },

  // Kontakt aktualisieren
  async updateKontakt(id: string, formData: OrganisationKontaktFormData): Promise<OrganisationKontakt> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_kontakte')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationKontakt;
  },

  // Kontakt löschen
  async deleteKontakt(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('organisation_kontakte')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }
  },

  // ==================== PLOTS ====================

  // Alle Plots einer Organisation
  async getPlots(organisationId: string): Promise<OrganisationPlot[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_plots')
      .select('*')
      .eq('organisation_id', organisationId)
      .order('gemarkung', { ascending: true });

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return (data || []) as OrganisationPlot[];
  },

  // Plot erstellen
  async createPlot(organisationId: string, formData: OrganisationPlotFormData): Promise<OrganisationPlot> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_plots')
      .insert([{ ...formData, organisation_id: organisationId }])
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationPlot;
  },

  // Plot aktualisieren
  async updatePlot(id: string, formData: OrganisationPlotFormData): Promise<OrganisationPlot> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_plots')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationPlot;
  },

  // Plot löschen
  async deletePlot(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('organisation_plots')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }
  },

  // ==================== PROJECTS ====================

  // Alle Projekte einer Organisation
  async getProjects(organisationId: string): Promise<OrganisationProject[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_projects')
      .select('*')
      .eq('organisation_id', organisationId)
      .order('projektname', { ascending: true });

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return (data || []) as OrganisationProject[];
  },

  // Projekt erstellen
  async createProject(organisationId: string, formData: OrganisationProjectFormData): Promise<OrganisationProject> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_projects')
      .insert([{ ...formData, organisation_id: organisationId }])
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationProject;
  },

  // Projekt aktualisieren
  async updateProject(id: string, formData: OrganisationProjectFormData): Promise<OrganisationProject> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_projects')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationProject;
  },

  // Projekt löschen
  async deleteProject(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('organisation_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }
  },

  // ==================== SERVICES ====================

  // Alle Services einer Organisation
  async getServices(organisationId: string): Promise<OrganisationService[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_services')
      .select('*')
      .eq('organisation_id', organisationId)
      .order('servicename', { ascending: true });

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return (data || []) as OrganisationService[];
  },

  // Service erstellen
  async createService(organisationId: string, formData: OrganisationServiceFormData): Promise<OrganisationService> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_services')
      .insert([{ ...formData, organisation_id: organisationId }])
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationService;
  },

  // Service aktualisieren
  async updateService(id: string, formData: OrganisationServiceFormData): Promise<OrganisationService> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('organisation_services')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }

    return data as OrganisationService;
  },

  // Service löschen
  async deleteService(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('organisation_services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Fehler:', error);
      throw new Error(`Datenbankfehler: ${error.message}`);
    }
  },
};
