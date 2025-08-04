import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sendWelcomeEmail, isNewUser } from '@/app/lib/email-service'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // Verificar que las variables de entorno estén configuradas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables not configured')
    return NextResponse.redirect(new URL('/login?error=config_error', requestUrl.origin))
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    })

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error && data.user) {
        // Verificar si es un usuario nuevo y enviar email de bienvenida
        if (isNewUser(data.user as any)) {
          try {
            const result = await sendWelcomeEmail(data.user as any)
            if (result.success) {
              console.log('Welcome email sent successfully')
            } else {
              console.error('Failed to send welcome email:', result.error)
            }
          } catch (emailError) {
            console.error('Error sending welcome email:', emailError)
            // No fallar la autenticación por problemas de email
          }
        }

        // Redirigir al dashboard o página principal después del login exitoso
        const response = NextResponse.redirect(new URL('/', requestUrl.origin))
        return response
      }
    } catch (error) {
      console.error('Error exchanging code for session:', error)
    }
  }

  // Si hay error, redirigir al login con mensaje de error
  return NextResponse.redirect(new URL('/login?error=auth_error', requestUrl.origin))
}
