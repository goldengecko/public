export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  auth: {
    Tables: {
      audit_log_entries: {
        Row: {
          created_at: string | null
          id: string
          instance_id: string | null
          ip_address: string
          payload: Json | null
        }
        Insert: {
          created_at?: string | null
          id: string
          instance_id?: string | null
          ip_address?: string
          payload?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_id?: string | null
          ip_address?: string
          payload?: Json | null
        }
        Relationships: []
      }
      flow_state: {
        Row: {
          auth_code: string
          auth_code_issued_at: string | null
          authentication_method: string
          code_challenge: string
          code_challenge_method: Database['auth']['Enums']['code_challenge_method']
          created_at: string | null
          id: string
          provider_access_token: string | null
          provider_refresh_token: string | null
          provider_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auth_code: string
          auth_code_issued_at?: string | null
          authentication_method: string
          code_challenge: string
          code_challenge_method: Database['auth']['Enums']['code_challenge_method']
          created_at?: string | null
          id: string
          provider_access_token?: string | null
          provider_refresh_token?: string | null
          provider_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auth_code?: string
          auth_code_issued_at?: string | null
          authentication_method?: string
          code_challenge?: string
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method']
          created_at?: string | null
          id?: string
          provider_access_token?: string | null
          provider_refresh_token?: string | null
          provider_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      identities: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          identity_data: Json
          last_sign_in_at: string | null
          provider: string
          provider_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          identity_data: Json
          last_sign_in_at?: string | null
          provider: string
          provider_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          identity_data?: Json
          last_sign_in_at?: string | null
          provider?: string
          provider_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'identities_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      instances: {
        Row: {
          created_at: string | null
          id: string
          raw_base_config: string | null
          updated_at: string | null
          uuid: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          raw_base_config?: string | null
          updated_at?: string | null
          uuid?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          raw_base_config?: string | null
          updated_at?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      mfa_amr_claims: {
        Row: {
          authentication_method: string
          created_at: string
          id: string
          session_id: string
          updated_at: string
        }
        Insert: {
          authentication_method: string
          created_at: string
          id: string
          session_id: string
          updated_at: string
        }
        Update: {
          authentication_method?: string
          created_at?: string
          id?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'mfa_amr_claims_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'sessions'
            referencedColumns: ['id']
          },
        ]
      }
      mfa_challenges: {
        Row: {
          created_at: string
          factor_id: string
          id: string
          ip_address: unknown
          verified_at: string | null
        }
        Insert: {
          created_at: string
          factor_id: string
          id: string
          ip_address: unknown
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          factor_id?: string
          id?: string
          ip_address?: unknown
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'mfa_challenges_auth_factor_id_fkey'
            columns: ['factor_id']
            isOneToOne: false
            referencedRelation: 'mfa_factors'
            referencedColumns: ['id']
          },
        ]
      }
      mfa_factors: {
        Row: {
          created_at: string
          factor_type: Database['auth']['Enums']['factor_type']
          friendly_name: string | null
          id: string
          secret: string | null
          status: Database['auth']['Enums']['factor_status']
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at: string
          factor_type: Database['auth']['Enums']['factor_type']
          friendly_name?: string | null
          id: string
          secret?: string | null
          status: Database['auth']['Enums']['factor_status']
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          factor_type?: Database['auth']['Enums']['factor_type']
          friendly_name?: string | null
          id?: string
          secret?: string | null
          status?: Database['auth']['Enums']['factor_status']
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'mfa_factors_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      one_time_tokens: {
        Row: {
          created_at: string
          id: string
          relates_to: string
          token_hash: string
          token_type: Database['auth']['Enums']['one_time_token_type']
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          relates_to: string
          token_hash: string
          token_type: Database['auth']['Enums']['one_time_token_type']
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          relates_to?: string
          token_hash?: string
          token_type?: Database['auth']['Enums']['one_time_token_type']
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'one_time_tokens_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      refresh_tokens: {
        Row: {
          created_at: string | null
          id: number
          instance_id: string | null
          parent: string | null
          revoked: boolean | null
          session_id: string | null
          token: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          instance_id?: string | null
          parent?: string | null
          revoked?: boolean | null
          session_id?: string | null
          token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          instance_id?: string | null
          parent?: string | null
          revoked?: boolean | null
          session_id?: string | null
          token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'refresh_tokens_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'sessions'
            referencedColumns: ['id']
          },
        ]
      }
      saml_providers: {
        Row: {
          attribute_mapping: Json | null
          created_at: string | null
          entity_id: string
          id: string
          metadata_url: string | null
          metadata_xml: string
          name_id_format: string | null
          sso_provider_id: string
          updated_at: string | null
        }
        Insert: {
          attribute_mapping?: Json | null
          created_at?: string | null
          entity_id: string
          id: string
          metadata_url?: string | null
          metadata_xml: string
          name_id_format?: string | null
          sso_provider_id: string
          updated_at?: string | null
        }
        Update: {
          attribute_mapping?: Json | null
          created_at?: string | null
          entity_id?: string
          id?: string
          metadata_url?: string | null
          metadata_xml?: string
          name_id_format?: string | null
          sso_provider_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'saml_providers_sso_provider_id_fkey'
            columns: ['sso_provider_id']
            isOneToOne: false
            referencedRelation: 'sso_providers'
            referencedColumns: ['id']
          },
        ]
      }
      saml_relay_states: {
        Row: {
          created_at: string | null
          flow_state_id: string | null
          for_email: string | null
          id: string
          redirect_to: string | null
          request_id: string
          sso_provider_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          flow_state_id?: string | null
          for_email?: string | null
          id: string
          redirect_to?: string | null
          request_id: string
          sso_provider_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          flow_state_id?: string | null
          for_email?: string | null
          id?: string
          redirect_to?: string | null
          request_id?: string
          sso_provider_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'saml_relay_states_flow_state_id_fkey'
            columns: ['flow_state_id']
            isOneToOne: false
            referencedRelation: 'flow_state'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'saml_relay_states_sso_provider_id_fkey'
            columns: ['sso_provider_id']
            isOneToOne: false
            referencedRelation: 'sso_providers'
            referencedColumns: ['id']
          },
        ]
      }
      schema_migrations: {
        Row: {
          version: string
        }
        Insert: {
          version: string
        }
        Update: {
          version?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          aal: Database['auth']['Enums']['aal_level'] | null
          created_at: string | null
          factor_id: string | null
          id: string
          ip: unknown | null
          not_after: string | null
          refreshed_at: string | null
          tag: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          aal?: Database['auth']['Enums']['aal_level'] | null
          created_at?: string | null
          factor_id?: string | null
          id: string
          ip?: unknown | null
          not_after?: string | null
          refreshed_at?: string | null
          tag?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          aal?: Database['auth']['Enums']['aal_level'] | null
          created_at?: string | null
          factor_id?: string | null
          id?: string
          ip?: unknown | null
          not_after?: string | null
          refreshed_at?: string | null
          tag?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sessions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      sso_domains: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          sso_provider_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          id: string
          sso_provider_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          sso_provider_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sso_domains_sso_provider_id_fkey'
            columns: ['sso_provider_id']
            isOneToOne: false
            referencedRelation: 'sso_providers'
            referencedColumns: ['id']
          },
        ]
      }
      sso_providers: {
        Row: {
          created_at: string | null
          id: string
          resource_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          resource_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          resource_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          aud: string | null
          banned_until: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          email_change: string | null
          email_change_confirm_status: number | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          id: string
          instance_id: string | null
          invited_at: string | null
          is_anonymous: boolean
          is_sso_user: boolean
          is_super_admin: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: string | null
          reauthentication_token: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id: string
          instance_id?: string | null
          invited_at?: string | null
          is_anonymous?: boolean
          is_sso_user?: boolean
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string
          instance_id?: string | null
          invited_at?: string | null
          is_anonymous?: boolean
          is_sso_user?: boolean
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      email: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      jwt: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      aal_level: 'aal1' | 'aal2' | 'aal3'
      code_challenge_method: 's256' | 'plain'
      factor_status: 'unverified' | 'verified'
      factor_type: 'totp' | 'webauthn'
      one_time_token_type:
        | 'confirmation_token'
        | 'reauthentication_token'
        | 'recovery_token'
        | 'email_change_token_new'
        | 'email_change_token_current'
        | 'phone_change_token'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      affiliate_balances: {
        Row: {
          balance: number
          id: number
          user_id: string
        }
        Insert: {
          balance?: number
          id?: number
          user_id: string
        }
        Update: {
          balance?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'affiliate_balances_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      commission_requests: {
        Row: {
          base_picture_id: number | null
          brush_style: Database['public']['Enums']['brush_style'] | null
          color1: string | null
          color2: string | null
          color3: string | null
          commission_type: Database['public']['Enums']['commission_type']
          decor_image_path: string | null
          description: string | null
          height: number
          id: number
          painting_style: Database['public']['Enums']['painting_style'] | null
          price: number
          reference_image_path: string | null
          status: string
          user_id: string
          width: number
        }
        Insert: {
          base_picture_id?: number | null
          brush_style?: Database['public']['Enums']['brush_style'] | null
          color1?: string | null
          color2?: string | null
          color3?: string | null
          commission_type: Database['public']['Enums']['commission_type']
          decor_image_path?: string | null
          description?: string | null
          height: number
          id?: number
          painting_style?: Database['public']['Enums']['painting_style'] | null
          price: number
          reference_image_path?: string | null
          status: string
          user_id: string
          width: number
        }
        Update: {
          base_picture_id?: number | null
          brush_style?: Database['public']['Enums']['brush_style'] | null
          color1?: string | null
          color2?: string | null
          color3?: string | null
          commission_type?: Database['public']['Enums']['commission_type']
          decor_image_path?: string | null
          description?: string | null
          height?: number
          id?: number
          painting_style?: Database['public']['Enums']['painting_style'] | null
          price?: number
          reference_image_path?: string | null
          status?: string
          user_id?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: 'commission_requests_base_picture_id_fkey'
            columns: ['base_picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'commission_requests_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      commission_settings: {
        Row: {
          commission_type: Database['public']['Enums']['commission_type']
          id: number
          initial_charge_percentage: number
        }
        Insert: {
          commission_type: Database['public']['Enums']['commission_type']
          id?: number
          initial_charge_percentage: number
        }
        Update: {
          commission_type?: Database['public']['Enums']['commission_type']
          id?: number
          initial_charge_percentage?: number
        }
        Relationships: []
      }
      commission_sizes: {
        Row: {
          id: number
          picture_id: number
          price: number
          size_id: number
        }
        Insert: {
          id?: number
          picture_id: number
          price: number
          size_id: number
        }
        Update: {
          id?: number
          picture_id?: number
          price?: number
          size_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'commission_sizes_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'commission_sizes_size_id_fkey'
            columns: ['size_id']
            isOneToOne: false
            referencedRelation: 'picture_sizes'
            referencedColumns: ['id']
          },
        ]
      }
      communications: {
        Row: {
          admin_id: string | null
          commission_id: number | null
          deleted_at: string | null
          id: number
          message: string
          order_id: number | null
          read_at: string | null
          sent_at: string
          thread_id: number | null
          user_id: string
        }
        Insert: {
          admin_id?: string | null
          commission_id?: number | null
          deleted_at?: string | null
          id?: number
          message: string
          order_id?: number | null
          read_at?: string | null
          sent_at?: string
          thread_id?: number | null
          user_id: string
        }
        Update: {
          admin_id?: string | null
          commission_id?: number | null
          deleted_at?: string | null
          id?: number
          message?: string
          order_id?: number | null
          read_at?: string | null
          sent_at?: string
          thread_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'communications_admin_id_fkey'
            columns: ['admin_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'communications_commission_id_fkey'
            columns: ['commission_id']
            isOneToOne: false
            referencedRelation: 'commission_requests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'communications_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'communications_thread_id_fkey'
            columns: ['thread_id']
            isOneToOne: false
            referencedRelation: 'communications'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'communications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      customer_reviews: {
        Row: {
          id: number
          product_id: number
          product_type: string
          rating: number
          review_date: string
          review_text: string | null
          user_id: string
        }
        Insert: {
          id?: number
          product_id: number
          product_type: string
          rating: number
          review_date?: string
          review_text?: string | null
          user_id: string
        }
        Update: {
          id?: number
          product_id?: number
          product_type?: string
          rating?: number
          review_date?: string
          review_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'customer_reviews_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      discounts: {
        Row: {
          applies_to: string
          auto_apply: boolean
          code: string
          end_date: string | null
          id: number
          percentage: number
          picture_id: number | null
          product_type: string | null
          single_use: boolean
          start_date: string
          used: boolean
        }
        Insert: {
          applies_to: string
          auto_apply?: boolean
          code: string
          end_date?: string | null
          id?: number
          percentage: number
          picture_id?: number | null
          product_type?: string | null
          single_use?: boolean
          start_date: string
          used?: boolean
        }
        Update: {
          applies_to?: string
          auto_apply?: boolean
          code?: string
          end_date?: string | null
          id?: number
          percentage?: number
          picture_id?: number | null
          product_type?: string | null
          single_use?: boolean
          start_date?: string
          used?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'discounts_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
        ]
      }
      galleries: {
        Row: {
          address: string
          commission_rate: number
          id: number
          name: string
          notes: string | null
        }
        Insert: {
          address: string
          commission_rate: number
          id?: number
          name: string
          notes?: string | null
        }
        Update: {
          address?: string
          commission_rate?: number
          id?: number
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      gallery_contacts: {
        Row: {
          email: string | null
          gallery_id: number
          id: number
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          email?: string | null
          gallery_id: number
          id?: number
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          email?: string | null
          gallery_id?: number
          id?: number
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'gallery_contacts_gallery_id_fkey'
            columns: ['gallery_id']
            isOneToOne: false
            referencedRelation: 'galleries'
            referencedColumns: ['id']
          },
        ]
      }
      gallery_sales: {
        Row: {
          contact_id: number | null
          customer_price: number
          gallery_commission: number
          gallery_id: number
          id: number
          net_income: number
          other_fees: number
          picture_id: number
          sale_date: string
        }
        Insert: {
          contact_id?: number | null
          customer_price: number
          gallery_commission: number
          gallery_id: number
          id?: number
          net_income: number
          other_fees?: number
          picture_id: number
          sale_date: string
        }
        Update: {
          contact_id?: number | null
          customer_price?: number
          gallery_commission?: number
          gallery_id?: number
          id?: number
          net_income?: number
          other_fees?: number
          picture_id?: number
          sale_date?: string
        }
        Relationships: [
          {
            foreignKeyName: 'gallery_sales_contact_id_fkey'
            columns: ['contact_id']
            isOneToOne: false
            referencedRelation: 'gallery_contacts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'gallery_sales_gallery_id_fkey'
            columns: ['gallery_id']
            isOneToOne: false
            referencedRelation: 'galleries'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'gallery_sales_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
        ]
      }
      multiple_item_discounts: {
        Row: {
          discount_percentage: number
          id: number
          product_type: string
          quantity: number
        }
        Insert: {
          discount_percentage: number
          id?: number
          product_type: string
          quantity: number
        }
        Update: {
          discount_percentage?: number
          id?: number
          product_type?: string
          quantity?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          base_price: number
          commission_id: number | null
          discounted_price: number
          id: number
          item_type: string
          order_id: number
          picture_id: number | null
          print_option_id: number | null
          product_id: number | null
          quantity: number
        }
        Insert: {
          base_price: number
          commission_id?: number | null
          discounted_price: number
          id?: number
          item_type: string
          order_id: number
          picture_id?: number | null
          print_option_id?: number | null
          product_id?: number | null
          quantity: number
        }
        Update: {
          base_price?: number
          commission_id?: number | null
          discounted_price?: number
          id?: number
          item_type?: string
          order_id?: number
          picture_id?: number | null
          print_option_id?: number | null
          product_id?: number | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: 'order_items_commission_id_fkey'
            columns: ['commission_id']
            isOneToOne: false
            referencedRelation: 'commission_requests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_print_option_id_fkey'
            columns: ['print_option_id']
            isOneToOne: false
            referencedRelation: 'print_options'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'other_products'
            referencedColumns: ['id']
          },
        ]
      }
      orders: {
        Row: {
          affiliate_id: string | null
          billing_address: Json
          carrier: string | null
          delivery_instructions: string | null
          discount_amount: number
          discount_code: string | null
          id: number
          order_date: string
          paid: boolean
          shipping_address: Json
          shipping_cost: number
          status: string
          tax_amount: number
          total_amount: number
          tracking_number: string | null
          user_id: string
        }
        Insert: {
          affiliate_id?: string | null
          billing_address: Json
          carrier?: string | null
          delivery_instructions?: string | null
          discount_amount?: number
          discount_code?: string | null
          id?: number
          order_date?: string
          paid?: boolean
          shipping_address: Json
          shipping_cost: number
          status: string
          tax_amount: number
          total_amount: number
          tracking_number?: string | null
          user_id: string
        }
        Update: {
          affiliate_id?: string | null
          billing_address?: Json
          carrier?: string | null
          delivery_instructions?: string | null
          discount_amount?: number
          discount_code?: string | null
          id?: number
          order_date?: string
          paid?: boolean
          shipping_address?: Json
          shipping_cost?: number
          status?: string
          tax_amount?: number
          total_amount?: number
          tracking_number?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_affiliate_id_fkey'
            columns: ['affiliate_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'orders_discount_code_fkey'
            columns: ['discount_code']
            isOneToOne: false
            referencedRelation: 'discounts'
            referencedColumns: ['code']
          },
          {
            foreignKeyName: 'orders_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      other_products: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      payment_records: {
        Row: {
          amount: number
          id: number
          order_id: number
          payment_date: string
          payment_method: string
          transaction_id: string
        }
        Insert: {
          amount: number
          id?: number
          order_id: number
          payment_date?: string
          payment_method: string
          transaction_id: string
        }
        Update: {
          amount?: number
          id?: number
          order_id?: number
          payment_date?: string
          payment_method?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'payment_records_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      picture_gallery_displays: {
        Row: {
          contact_id: number | null
          display_end: string | null
          display_start: string
          gallery_id: number
          id: number
          notes: string | null
          picture_id: number
          returned_date: string | null
          shipped_date: string | null
        }
        Insert: {
          contact_id?: number | null
          display_end?: string | null
          display_start: string
          gallery_id: number
          id?: number
          notes?: string | null
          picture_id: number
          returned_date?: string | null
          shipped_date?: string | null
        }
        Update: {
          contact_id?: number | null
          display_end?: string | null
          display_start?: string
          gallery_id?: number
          id?: number
          notes?: string | null
          picture_id?: number
          returned_date?: string | null
          shipped_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'picture_gallery_displays_contact_id_fkey'
            columns: ['contact_id']
            isOneToOne: false
            referencedRelation: 'gallery_contacts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'picture_gallery_displays_gallery_id_fkey'
            columns: ['gallery_id']
            isOneToOne: false
            referencedRelation: 'galleries'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'picture_gallery_displays_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
        ]
      }
      picture_products: {
        Row: {
          id: number
          image_path: string
          picture_id: number
          product_id: number
        }
        Insert: {
          id?: number
          image_path: string
          picture_id: number
          product_id: number
        }
        Update: {
          id?: number
          image_path?: string
          picture_id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'picture_products_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'picture_products_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'other_products'
            referencedColumns: ['id']
          },
        ]
      }
      picture_sizes: {
        Row: {
          aspect_ratio: number
          height: number
          id: number
          width: number
        }
        Insert: {
          aspect_ratio: number
          height: number
          id?: number
          width: number
        }
        Update: {
          aspect_ratio?: number
          height?: number
          id?: number
          width?: number
        }
        Relationships: []
      }
      pictures: {
        Row: {
          actual_height: number
          actual_width: number
          artist_statement: string | null
          available: boolean
          brush_styles: Database['public']['Enums']['brush_style'][]
          color_data: string
          commissionable: boolean
          description: string
          frame: Database['public']['Enums']['frame_type']
          generation: number
          id: number
          identifier: string
          in_stock: boolean
          main_image_path: string
          painted_date: string
          painting_styles: Database['public']['Enums']['painting_style'][]
          pixel_height: number
          pixel_width: number
          price: number
          supporting_images: Json
          title: string
        }
        Insert: {
          actual_height: number
          actual_width: number
          artist_statement?: string | null
          available?: boolean
          brush_styles: Database['public']['Enums']['brush_style'][]
          color_data: string
          commissionable: boolean
          description: string
          frame: Database['public']['Enums']['frame_type']
          generation: number
          id?: number
          identifier: string
          in_stock?: boolean
          main_image_path: string
          painted_date: string
          painting_styles: Database['public']['Enums']['painting_style'][]
          pixel_height: number
          pixel_width: number
          price: number
          supporting_images?: Json
          title: string
        }
        Update: {
          actual_height?: number
          actual_width?: number
          artist_statement?: string | null
          available?: boolean
          brush_styles?: Database['public']['Enums']['brush_style'][]
          color_data?: string
          commissionable?: boolean
          description?: string
          frame?: Database['public']['Enums']['frame_type']
          generation?: number
          id?: number
          identifier?: string
          in_stock?: boolean
          main_image_path?: string
          painted_date?: string
          painting_styles?: Database['public']['Enums']['painting_style'][]
          pixel_height?: number
          pixel_width?: number
          price?: number
          supporting_images?: Json
          title?: string
        }
        Relationships: []
      }
      print_media: {
        Row: {
          description: string
          id: number
          name: string
        }
        Insert: {
          description: string
          id?: number
          name: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      print_options: {
        Row: {
          id: number
          medium_id: number
          price: number
          print_id: number
          provider_id: number
          size_id: number
        }
        Insert: {
          id?: number
          medium_id: number
          price: number
          print_id: number
          provider_id: number
          size_id: number
        }
        Update: {
          id?: number
          medium_id?: number
          price?: number
          print_id?: number
          provider_id?: number
          size_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'print_options_medium_id_fkey'
            columns: ['medium_id']
            isOneToOne: false
            referencedRelation: 'print_media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'print_options_print_id_fkey'
            columns: ['print_id']
            isOneToOne: false
            referencedRelation: 'prints'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'print_options_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'print_options_size_id_fkey'
            columns: ['size_id']
            isOneToOne: false
            referencedRelation: 'picture_sizes'
            referencedColumns: ['id']
          },
        ]
      }
      prints: {
        Row: {
          id: number
          image_path: string
          picture_id: number
          provider_id: number
          suggested_medium_id: number | null
        }
        Insert: {
          id?: number
          image_path: string
          picture_id: number
          provider_id: number
          suggested_medium_id?: number | null
        }
        Update: {
          id?: number
          image_path?: string
          picture_id?: number
          provider_id?: number
          suggested_medium_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'prints_picture_id_fkey'
            columns: ['picture_id']
            isOneToOne: false
            referencedRelation: 'pictures'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'prints_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'prints_suggested_medium_id_fkey'
            columns: ['suggested_medium_id']
            isOneToOne: false
            referencedRelation: 'print_media'
            referencedColumns: ['id']
          },
        ]
      }
      projects: {
        Row: {
          collaborators: string[]
          created_at: string
          id: number
          name: string
          slug: string
          status: Database['public']['Enums']['current_status']
        }
        Insert: {
          collaborators?: string[]
          created_at?: string
          id?: never
          name: string
          slug: string
          status?: Database['public']['Enums']['current_status']
        }
        Update: {
          collaborators?: string[]
          created_at?: string
          id?: never
          name?: string
          slug?: string
          status?: Database['public']['Enums']['current_status']
        }
        Relationships: []
      }
      providers: {
        Row: {
          address: string | null
          contact_name: string | null
          description: string | null
          email: string | null
          id: number
          name: string
          notes: string | null
          phone: string | null
          production_time: number
          supported_countries: string[]
          supported_media: number[] | null
        }
        Insert: {
          address?: string | null
          contact_name?: string | null
          description?: string | null
          email?: string | null
          id?: number
          name: string
          notes?: string | null
          phone?: string | null
          production_time: number
          supported_countries: string[]
          supported_media?: number[] | null
        }
        Update: {
          address?: string | null
          contact_name?: string | null
          description?: string | null
          email?: string | null
          id?: number
          name?: string
          notes?: string | null
          phone?: string | null
          production_time?: number
          supported_countries?: string[]
          supported_media?: number[] | null
        }
        Relationships: []
      }
      shipping_costs: {
        Row: {
          cost: number
          country: string
          id: number
          max_area: number | null
          min_area: number | null
          product_type: string
          provider_id: number | null
          shipping_time: number
          size_id: number | null
          state: string | null
        }
        Insert: {
          cost: number
          country: string
          id?: number
          max_area?: number | null
          min_area?: number | null
          product_type: string
          provider_id?: number | null
          shipping_time: number
          size_id?: number | null
          state?: string | null
        }
        Update: {
          cost?: number
          country?: string
          id?: number
          max_area?: number | null
          min_area?: number | null
          product_type?: string
          provider_id?: number | null
          shipping_time?: number
          size_id?: number | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'shipping_costs_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'shipping_costs_size_id_fkey'
            columns: ['size_id']
            isOneToOne: false
            referencedRelation: 'picture_sizes'
            referencedColumns: ['id']
          },
        ]
      }
      style_price_multipliers: {
        Row: {
          id: number
          multiplier: number
          style: string
          style_type: string
        }
        Insert: {
          id?: number
          multiplier: number
          style: string
          style_type: string
        }
        Update: {
          id?: number
          multiplier?: number
          style?: string
          style_type?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          id: number
          key: string
          value: string
        }
        Insert: {
          id?: number
          key: string
          value: string
        }
        Update: {
          id?: number
          key?: string
          value?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          collaborators: string[]
          created_at: string
          description: string
          due_date: string | null
          id: number
          name: string
          project_id: number | null
          status: Database['public']['Enums']['current_status']
        }
        Insert: {
          collaborators?: string[]
          created_at?: string
          description: string
          due_date?: string | null
          id?: never
          name: string
          project_id?: number | null
          status?: Database['public']['Enums']['current_status']
        }
        Update: {
          collaborators?: string[]
          created_at?: string
          description?: string
          due_date?: string | null
          id?: never
          name?: string
          project_id?: number | null
          status?: Database['public']['Enums']['current_status']
        }
        Relationships: [
          {
            foreignKeyName: 'tasks_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      product_ratings: {
        Row: {
          average_rating: number | null
          product_id: number | null
          product_type: string | null
          review_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      brush_style: 'Detailed' | 'Expressive' | 'Palette Knife'
      commission_type: 'Duplicate' | 'Variation' | 'Custom'
      current_status: 'in-progress' | 'completed'
      frame_type: 'Unframed' | 'Floating' | 'Traditional'
      painting_style:
        | 'Realist'
        | 'Impressionist'
        | 'Abstract'
        | 'Expressionist'
        | 'Surrealist'
        | 'Romantic'
        | 'Minimalist'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
