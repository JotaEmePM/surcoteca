'use client'

import { createClient } from '../lib/supabase'

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  // Si no hay configuración de Supabase en desarrollo, mostrar mensaje
  const supabase = createClient()
  
  if (!supabase && process.env.NODE_ENV === 'development') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">
            Configuración de Supabase Requerida
          </h2>
          <p className="text-yellow-700 text-sm mb-4">
            Para usar las funciones de autenticación, necesitas configurar las variables de entorno de Supabase.
          </p>
          <div className="text-left bg-gray-100 p-3 rounded text-xs font-mono">
            <div>NEXT_PUBLIC_SUPABASE_URL=tu_url</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key</div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
