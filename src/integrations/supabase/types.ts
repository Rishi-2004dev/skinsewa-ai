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
      blog_posts: {
        Row: {
          author_image: string | null
          author_name: string | null
          author_title: string | null
          category: string
          date: string
          description: string
          full_content: string
          id: string
          image: string
          reading_time: string
          tags: string[]
          title: string
          url: string | null
        }
        Insert: {
          author_image?: string | null
          author_name: string | null
          author_title?: string | null
          category: string
          date?: string
          description: string
          full_content: string
          id?: string
          image: string
          reading_time: string
          tags?: string[]
          title: string
          url?: string | null
        }
        Update: {
          author_image?: string | null
          author_name?: string | null
          author_title?: string | null
          category?: string
          date?: string
          description?: string
          full_content?: string
          id?: string
          image?: string
          reading_time?: string
          tags?: string[]
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      clinics: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          name: string
          password: string
          updated_at: string
          username: string
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name: string
          password: string
          updated_at?: string
          username: string
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string
          password?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          author: string | null
          author_image: string | null
          comments: number | 0
          date: string | "Now"
          description: string
          id: string
          is_poll: boolean | false
          likes: number | 0
          poll_options: Json | null
          poll_type: string | null
          shares: number | 0
          tags: string[] | null
          title: string
        }
        Insert: {
          author: string | null
          author_image?: string | null
          comments?: number | 0
          date?: string | "Now"
          description: string
          id?: string
          is_poll?: boolean | false
          likes?: number | 0
          poll_options?: Json | null
          poll_type?: string | null
          shares?: number | 0
          tags?: string[]
          title: string
        }
        Update: {
          author?: string | null
          author_image?: string | null
          comments?: number
          date?: string
          description?: string
          id?: string
          is_poll?: boolean
          likes?: number
          poll_options?: Json | null
          poll_type?: string | null
          shares?: number
          tags?: string[]
          title?: string
        }
        Relationships: []
      }
      patient_reports: {
        Row: {
          clinic_id: string | null
          created_at: string
          diagnosis: string | null
          id: string
          notes: string | null
          patient_email: string | null
          patient_name: string
          patient_phone: string | null
          report_id: string
          updated_at: string
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string
          diagnosis?: string | null
          id?: string
          notes?: string | null
          patient_email?: string | null
          patient_name: string
          patient_phone?: string | null
          report_id: string
          updated_at?: string
        }
        Update: {
          clinic_id?: string | null
          created_at?: string
          diagnosis?: string | null
          id?: string
          notes?: string | null
          patient_email?: string | null
          patient_name?: string
          patient_phone?: string | null
          report_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_reports_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_votes: {
        Row: {
          created_at: string
          id: string
          option_id: number
          post_id: string | null
          user_identifier: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_id: number
          post_id?: string | null
          user_identifier: string
        }
        Update: {
          created_at?: string
          id?: string
          option_id?: number
          post_id?: string | null
          user_identifier?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          author: string
          author_image: string | null
          date: string
          id: string
          post_id: string | null
          text: string
        }
        Insert: {
          author: string
          author_image?: string | null
          date?: string
          id?: string
          post_id?: string | null
          text: string
        }
        Update: {
          author?: string
          author_image?: string | null
          date?: string
          id?: string
          post_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          user_identifier: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_identifier: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_identifier?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_shares: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          user_identifier: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_identifier: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_identifier?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_shares_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
