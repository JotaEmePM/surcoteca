import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

// Cliente para el navegador
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Cliente legacy para compatibilidad
export const supabase = supabaseUrl && supabaseAnonKey
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null

// Tipos para TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
    },
    categories: {
      Row: {
        id: string
        name: string
        slug: string
      }
    }
  };
};