import { createServerSupabaseClient } from '../lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function ServerProfilePage() {
  const supabase = await createServerSupabaseClient()
  
  if (!supabase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Supabase no configurado</div>
      </div>
    )
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Mi Perfil (Server Component)
        </h1>
        
        <div className="bg-secondary rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {user.user_metadata?.avatar_url && (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {user.user_metadata?.full_name || 'Usuario'}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <p><strong>Usuario de GitHub:</strong> {user.user_metadata?.user_name || 'N/A'}</p>
            <p><strong>Cuenta creada:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            <p><strong>Última conexión:</strong> {new Date(user.last_sign_in_at || '').toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Datos del usuario (Server-side)</h3>
          <pre className="bg-muted p-4 rounded text-xs overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            Esta página se renderiza en el servidor usando Server Components.
            Los datos del usuario se obtienen directamente del servidor.
          </p>
        </div>
      </div>
    </div>
  )
}
