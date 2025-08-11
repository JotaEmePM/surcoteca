import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sendWelcomeEmail, type EmailUser } from '@/lib/email-service'
import { UserEmailSentInterface } from '../../models/user-email-sent.interface'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // Verificar que las variables de entorno estén configuradas
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables not configured')
    return NextResponse.redirect(new URL('/error?error=config_error', requestUrl.origin))
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
        const { data: userRow, error: userQueryError } = await supabase
          .from('users')
          .select('id, name, welcome_sent')
          .eq('id', data.user.id)
          .maybeSingle<UserEmailSentInterface>()

        if (userQueryError) {
          console.log('Failed query user data', userQueryError)
        }

        if (userRow && userRow.welcome_sent === false) {
          try {
            const result = await sendWelcomeEmail(data.user as EmailUser)
            if (result.success) {
              const { error: updateError } = await supabase
                .from('users')
                .update({ welcome_sent: true })
                .eq('id', data.user.id)

              if (!updateError) {
                console.log('Welcome email sent successfully')
              } else {
                console.error('Failed to update welcome_sent flag:', updateError)
              }
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
