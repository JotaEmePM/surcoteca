import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from './supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    const supabase = createClient();
    
    // Si Supabase no está configurado, marcar como no loading
    if (!supabase) {
      setAuthState({
        user: null,
        session: null,
        loading: false,
      });
      return;
    }

    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
        });
      } catch (error) {
        console.error('Error getting session:', error);
        setAuthState({
          user: null,
          session: null,
          loading: false,
        });
      }
    };

    getInitialSession();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Función para login con GitHub
  const signInWithGitHub = async () => {
    const supabase = createClient();
    
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Función para logout
  const signOut = async () => {
    const supabase = createClient();
    
    if (!supabase) {
      return { error: new Error('Supabase not configured') };
    }

    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  };

  return {
    ...authState,
    signInWithGitHub,
    signOut,
  };
};
