import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from './supabase';
import { getBaseUrl } from './utils';

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
      const redirectTo = `https://www.surcoteca.cl/auth/callback`;
      console.log('Redirect URL:', redirectTo);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo,
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Función para login con Google
  const signInWithGoogle = async () => {
    const supabase = createClient();
    
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') };
    }

    try {
      const redirectTo = `https://www.surcoteca.cl/auth/callback`;
      console.log('Redirect URL:', redirectTo);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Función genérica para login con cualquier proveedor OAuth
  const signInWithProvider = async (provider: 'github' | 'google') => {
    const supabase = createClient();
    
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') };
    }

    try {
      const redirectTo = `https://www.surcoteca.cl/auth/callback`;
      console.log('Redirect URL:', redirectTo);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
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
    signInWithGoogle,
    signInWithProvider,
    signOut,
  };
};
