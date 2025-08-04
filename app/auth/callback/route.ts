import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // Verificar que las variables de entorno estén configuradas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables not configured');
    return NextResponse.redirect(new URL('/login?error=config_error', requestUrl.origin));
  }

  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error) {
        // Redirigir al dashboard o página principal después del login exitoso
        return NextResponse.redirect(new URL('/', requestUrl.origin));
      }
    } catch (error) {
      console.error('Error exchanging code for session:', error);
    }
  }

  // Si hay error, redirigir al login con mensaje de error
  return NextResponse.redirect(new URL('/login?error=auth_error', requestUrl.origin));
}
