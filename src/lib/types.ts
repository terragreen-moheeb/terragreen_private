export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billing_accounts: {
        Row: {
          billing_address: Json
          brand: string | null
          created_at: string
          id: string
          last_four: string | null
          stripe_payment_method_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_address: Json
          brand?: string | null
          created_at?: string
          id?: string
          last_four?: string | null
          stripe_payment_method_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_address?: Json
          brand?: string | null
          created_at?: string
          id?: string
          last_four?: string | null
          stripe_payment_method_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          billing_period_end: string
          billing_period_start: string
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string
          paid_at: string | null
          pdf_url: string | null
          project_id: string | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          user_id: string | null
        }
        Insert: {
          billing_period_end: string
          billing_period_start: string
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number: string
          paid_at?: string | null
          pdf_url?: string | null
          project_id?: string | null
          status?: string | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          user_id?: string | null
        }
        Update: {
          billing_period_end?: string
          billing_period_start?: string
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          paid_at?: string | null
          pdf_url?: string | null
          project_id?: string | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects_basics"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      project_analysis: {
        Row: {
          analysis_completed: boolean | null
          created_at: string
          demographie: Json | null
          finance: Json | null
          flood_score: number | null
          heat_score: number | null
          id: string
          is_analyzing: boolean | null
          noise_score: number | null
          pois: Json | null
          updated_at: string
        }
        Insert: {
          analysis_completed?: boolean | null
          created_at?: string
          demographie?: Json | null
          finance?: Json | null
          flood_score?: number | null
          heat_score?: number | null
          id: string
          is_analyzing?: boolean | null
          noise_score?: number | null
          pois?: Json | null
          updated_at?: string
        }
        Update: {
          analysis_completed?: boolean | null
          created_at?: string
          demographie?: Json | null
          finance?: Json | null
          flood_score?: number | null
          heat_score?: number | null
          id?: string
          is_analyzing?: boolean | null
          noise_score?: number | null
          pois?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_analysis_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "projects_basics"
            referencedColumns: ["id"]
          },
        ]
      }
      project_billing: {
        Row: {
          billing_plan_id: string | null
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          project_id: string | null
          start_date: string
        }
        Insert: {
          billing_plan_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          project_id?: string | null
          start_date: string
        }
        Update: {
          billing_plan_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          project_id?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_billing_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects_basics"
            referencedColumns: ["id"]
          },
        ]
      }
      project_likes: {
        Row: {
          broker_user_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          project_short_id: string
          user_id: string
        }
        Insert: {
          broker_user_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          project_short_id: string
          user_id: string
        }
        Update: {
          broker_user_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          project_short_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_likes_project_short_id_fkey"
            columns: ["project_short_id"]
            isOneToOne: false
            referencedRelation: "projects_basics"
            referencedColumns: ["short_id"]
          },
        ]
      }
      project_messages: {
        Row: {
          created_at: string | null
          id: string
          project_short_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_short_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_short_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_messages_project_short_id_fkey"
            columns: ["project_short_id"]
            isOneToOne: false
            referencedRelation: "projects_basics"
            referencedColumns: ["short_id"]
          },
        ]
      }
      project_views: {
        Row: {
          created_at: string | null
          id: string
          origin_country: string | null
          project_short_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          origin_country?: string | null
          project_short_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          origin_country?: string | null
          project_short_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_views_project_short_id_fkey"
            columns: ["project_short_id"]
            isOneToOne: false
            referencedRelation: "projects_basics"
            referencedColumns: ["short_id"]
          },
        ]
      }
      projects_additional: {
        Row: {
          additional_equipment_features: string[] | null
          additional_extended_usable_areas: string[] | null
          additional_sustainability_features: string[] | null
          certifications: string[] | null
          efficiency_house_level: string | null
          energy_certificate_status: string | null
          energy_efficiency_class: string | null
          energy_source: string | null
          equipment_features: string[] | null
          extended_usable_areas: string[] | null
          final_energy_requirement: number | null
          funding_kfw: string[] | null
          ghg_emissions_construction: number | null
          ghg_emissions_operation: number | null
          heating_type: string | null
          peak_power_kw: number | null
          primary_energy_demand: number | null
          project_id: string
          pv_storage_available: boolean | null
          pv_storage_capacity: number | null
          pv_system_available: boolean | null
          structural_features: string[] | null
          technical_equipment: string[] | null
          tests_carried_out: string[] | null
          website: string | null
        }
        Insert: {
          additional_equipment_features?: string[] | null
          additional_extended_usable_areas?: string[] | null
          additional_sustainability_features?: string[] | null
          certifications?: string[] | null
          efficiency_house_level?: string | null
          energy_certificate_status?: string | null
          energy_efficiency_class?: string | null
          energy_source?: string | null
          equipment_features?: string[] | null
          extended_usable_areas?: string[] | null
          final_energy_requirement?: number | null
          funding_kfw?: string[] | null
          ghg_emissions_construction?: number | null
          ghg_emissions_operation?: number | null
          heating_type?: string | null
          peak_power_kw?: number | null
          primary_energy_demand?: number | null
          project_id: string
          pv_storage_available?: boolean | null
          pv_storage_capacity?: number | null
          pv_system_available?: boolean | null
          structural_features?: string[] | null
          technical_equipment?: string[] | null
          tests_carried_out?: string[] | null
          website?: string | null
        }
        Update: {
          additional_equipment_features?: string[] | null
          additional_extended_usable_areas?: string[] | null
          additional_sustainability_features?: string[] | null
          certifications?: string[] | null
          efficiency_house_level?: string | null
          energy_certificate_status?: string | null
          energy_efficiency_class?: string | null
          energy_source?: string | null
          equipment_features?: string[] | null
          extended_usable_areas?: string[] | null
          final_energy_requirement?: number | null
          funding_kfw?: string[] | null
          ghg_emissions_construction?: number | null
          ghg_emissions_operation?: number | null
          heating_type?: string | null
          peak_power_kw?: number | null
          primary_energy_demand?: number | null
          project_id?: string
          pv_storage_available?: boolean | null
          pv_storage_capacity?: number | null
          pv_system_available?: boolean | null
          structural_features?: string[] | null
          technical_equipment?: string[] | null
          tests_carried_out?: string[] | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_project"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects_basics"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_admin_data: {
        Row: {
          billing_account: string | null
          created_at: string | null
          last_validation_at: string | null
          project_completed: boolean | null
          project_id: string
          step_1_completed: boolean | null
          step_2_completed: boolean | null
          step_3_completed: boolean | null
          updated_at: string | null
        }
        Insert: {
          billing_account?: string | null
          created_at?: string | null
          last_validation_at?: string | null
          project_completed?: boolean | null
          project_id: string
          step_1_completed?: boolean | null
          step_2_completed?: boolean | null
          step_3_completed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          billing_account?: string | null
          created_at?: string | null
          last_validation_at?: string | null
          project_completed?: boolean | null
          project_id?: string
          step_1_completed?: boolean | null
          step_2_completed?: boolean | null
          step_3_completed?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_admin_data_billing_account_fkey"
            columns: ["billing_account"]
            isOneToOne: false
            referencedRelation: "billing_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_admin_data_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects_basics"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_basics: {
        Row: {
          address: Json | null
          commission: number | null
          commission_free: boolean | null
          completion_quarter: string | null
          computed_latitude: number | null
          computed_longitude: number | null
          construction_year: number | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          lage: string | null
          living_area_from: number | null
          living_area_to: number | null
          number_of_parking: number | null
          number_of_units: number | null
          parking_price_from: number | null
          parking_price_to: number | null
          plot_area: number | null
          price_from: number | null
          price_to: number | null
          published_at: string | null
          rent_from: number | null
          rent_to: number | null
          rooms_from: number | null
          rooms_to: number | null
          search_vector: unknown | null
          short_id: string | null
          slug: string | null
          sold_percentage: number | null
          status: string | null
          title: string
          total_living_area: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: Json | null
          commission?: number | null
          commission_free?: boolean | null
          completion_quarter?: string | null
          computed_latitude?: number | null
          computed_longitude?: number | null
          construction_year?: number | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          lage?: string | null
          living_area_from?: number | null
          living_area_to?: number | null
          number_of_parking?: number | null
          number_of_units?: number | null
          parking_price_from?: number | null
          parking_price_to?: number | null
          plot_area?: number | null
          price_from?: number | null
          price_to?: number | null
          published_at?: string | null
          rent_from?: number | null
          rent_to?: number | null
          rooms_from?: number | null
          rooms_to?: number | null
          search_vector?: unknown | null
          short_id?: string | null
          slug?: string | null
          sold_percentage?: number | null
          status?: string | null
          title: string
          total_living_area?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: Json | null
          commission?: number | null
          commission_free?: boolean | null
          completion_quarter?: string | null
          computed_latitude?: number | null
          computed_longitude?: number | null
          construction_year?: number | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          lage?: string | null
          living_area_from?: number | null
          living_area_to?: number | null
          number_of_parking?: number | null
          number_of_units?: number | null
          parking_price_from?: number | null
          parking_price_to?: number | null
          plot_area?: number | null
          price_from?: number | null
          price_to?: number | null
          published_at?: string | null
          rent_from?: number | null
          rent_to?: number | null
          rooms_from?: number | null
          rooms_to?: number | null
          search_vector?: unknown | null
          short_id?: string | null
          slug?: string | null
          sold_percentage?: number | null
          status?: string | null
          title?: string
          total_living_area?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_basics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_basics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      projects_files: {
        Row: {
          category: string | null
          deleted_at: string | null
          description: string | null
          file_name: string | null
          file_path: string | null
          file_type: string | null
          file_url: string | null
          id: string
          is_title: boolean | null
          mime_type: string | null
          project_short_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          deleted_at?: string | null
          description?: string | null
          file_name?: string | null
          file_path?: string | null
          file_type?: string | null
          file_url?: string | null
          id: string
          is_title?: boolean | null
          mime_type?: string | null
          project_short_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          deleted_at?: string | null
          description?: string | null
          file_name?: string | null
          file_path?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_title?: boolean | null
          mime_type?: string | null
          project_short_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects_orders: {
        Row: {
          additional_data: Json | null
          created_at: string | null
          id: string
          project_short_id: string | null
          service_title: string
          service_type: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          project_short_id?: string | null
          service_title: string
          service_type: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          project_short_id?: string | null
          service_title?: string
          service_type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_project"
            columns: ["project_short_id"]
            isOneToOne: false
            referencedRelation: "projects_basics"
            referencedColumns: ["short_id"]
          },
        ]
      }
      user_ips: {
        Row: {
          created_at: string
          description: string | null
          id: string
          ip_address: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          ip_address: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users_profile: {
        Row: {
          about_me: string | null
          agb_accepted: string | null
          company_address: Json | null
          company_logo_url: string | null
          company_name: string | null
          created_at: string | null
          id: string
          notification_settings: Json | null
          phone: string | null
          preferences: Json | null
          stripe_customer_id: string | null
          updated_at: string | null
          vat_id: string | null
        }
        Insert: {
          about_me?: string | null
          agb_accepted?: string | null
          company_address?: Json | null
          company_logo_url?: string | null
          company_name?: string | null
          created_at?: string | null
          id: string
          notification_settings?: Json | null
          phone?: string | null
          preferences?: Json | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          vat_id?: string | null
        }
        Update: {
          about_me?: string | null
          agb_accepted?: string | null
          company_address?: Json | null
          company_logo_url?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          notification_settings?: Json | null
          phone?: string | null
          preferences?: Json | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          vat_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_profile_public: {
        Row: {
          about_me: string | null
          company_address: Json | null
          company_logo_url: string | null
          company_name: string | null
          email: string | null
          id: string | null
          phone: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_unique_project_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_by_email: {
        Args: { p_email: string }
        Returns: {
          id: string
          email: string
        }[]
      }
      validate_step_3: {
        Args: { logo_url: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

