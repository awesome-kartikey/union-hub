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
      profiles: {
        Row: {
          annual_income: number | null
          caste: string | null
          city: string | null
          complexion: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          degree: string | null
          dietary_preferences: string | null
          drinking_habits: boolean | null
          education_qualification: string | null
          email: string | null
          expected_qualification: string | null
          family_type: string | null
          family_value_system: string | null
          full_name: string | null
          gender: string | null
          height: number | null
          hobbies: string[] | null
          id: string
          interests: string[] | null
          languages_known: string[] | null
          marital_status_preference: string | null
          mother_tongue: string | null
          parents_occupation: string | null
          phone_number: string | null
          physical_disability: string | null
          preferred_age_range: unknown | null
          preferred_height_range: unknown | null
          preferred_location: string | null
          preferred_profession: string | null
          profession: string | null
          professional_status: string | null
          profile_photo_url: string | null
          religion: string | null
          siblings_details: string | null
          smoking_habits: boolean | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          annual_income?: number | null
          caste?: string | null
          city?: string | null
          complexion?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          degree?: string | null
          dietary_preferences?: string | null
          drinking_habits?: boolean | null
          education_qualification?: string | null
          email?: string | null
          expected_qualification?: string | null
          family_type?: string | null
          family_value_system?: string | null
          full_name?: string | null
          gender?: string | null
          height?: number | null
          hobbies?: string[] | null
          id: string
          interests?: string[] | null
          languages_known?: string[] | null
          marital_status_preference?: string | null
          mother_tongue?: string | null
          parents_occupation?: string | null
          phone_number?: string | null
          physical_disability?: string | null
          preferred_age_range?: unknown | null
          preferred_height_range?: unknown | null
          preferred_location?: string | null
          preferred_profession?: string | null
          profession?: string | null
          professional_status?: string | null
          profile_photo_url?: string | null
          religion?: string | null
          siblings_details?: string | null
          smoking_habits?: boolean | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          annual_income?: number | null
          caste?: string | null
          city?: string | null
          complexion?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          degree?: string | null
          dietary_preferences?: string | null
          drinking_habits?: boolean | null
          education_qualification?: string | null
          email?: string | null
          expected_qualification?: string | null
          family_type?: string | null
          family_value_system?: string | null
          full_name?: string | null
          gender?: string | null
          height?: number | null
          hobbies?: string[] | null
          id?: string
          interests?: string[] | null
          languages_known?: string[] | null
          marital_status_preference?: string | null
          mother_tongue?: string | null
          parents_occupation?: string | null
          phone_number?: string | null
          physical_disability?: string | null
          preferred_age_range?: unknown | null
          preferred_height_range?: unknown | null
          preferred_location?: string | null
          preferred_profession?: string | null
          profession?: string | null
          professional_status?: string | null
          profile_photo_url?: string | null
          religion?: string | null
          siblings_details?: string | null
          smoking_habits?: boolean | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
