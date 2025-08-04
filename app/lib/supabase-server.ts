import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // El método `setAll` fue llamado desde un Server Component.
          // Esto puede ser ignorado si tienes middleware refrescando
          // sesiones de usuario.
        }
      },
    },
  });
};
