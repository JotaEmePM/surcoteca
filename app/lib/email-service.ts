import { render } from '@react-email/render'
import React from 'react'
import { resend, RESEND_CONFIG } from './resend'
import { WelcomeEmail } from './email-templates'

export interface EmailUser {
    id: string
    email: string
    user_metadata: {
        name?: string
        full_name?: string
        avatar_url?: string
        provider?: string
    }
}

/**
 * Envía un correo de bienvenida a un nuevo usuario
 */
export async function sendWelcomeEmail(user: EmailUser) {
    if (!resend) {
        console.warn('Resend not configured, skipping welcome email')
        return { success: false, error: 'Resend not configured' }
    }

    try {
        // Obtener el nombre del usuario
        const userName = user.user_metadata.name ||
            user.user_metadata.full_name ||
            user.email.split('@')[0] ||
            'Usuario'

        // Renderizar la plantilla del email
        const emailHtml = await render(
            React.createElement(WelcomeEmail, {
                userName,
                userEmail: user.email
            })
        )

        // Enviar el email
        const { data, error } = await resend.emails.send({
            from: RESEND_CONFIG.from,
            to: user.email,
            replyTo: RESEND_CONFIG.replyTo,
            subject: '¡Bienvenido a Surcoteca! 🎉',
            html: emailHtml,
            tags: [
                { name: 'category', value: 'welcome' },
                { name: 'user_id', value: user.id },
            ],
        })

        if (error) {
            console.error('Error sending welcome email:', error)
            return { success: false, error: error.message }
        }

        console.log('Welcome email sent successfully:', data?.id)
        return { success: true, data }
    } catch (error) {
        console.error('Error sending welcome email:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Función genérica para enviar emails
 */
export async function sendEmail({
    to,
    subject,
    html,
    text,
    tags = [],
}: {
    to: string | string[]
    subject: string
    html?: string
    text?: string
    tags?: Array<{ name: string; value: string }>
}) {
    if (!resend) {
        console.warn('Resend not configured, skipping email')
        return { success: false, error: 'Resend not configured' }
    }

    // Asegurar que tenemos al menos text o html
    if (!html && !text) {
        return { success: false, error: 'Either html or text must be provided' }
    }

    try {
        const emailOptions: any = {
            from: RESEND_CONFIG.from,
            to,
            replyTo: RESEND_CONFIG.replyTo,
            subject,
            tags,
        }

        if (html) {
            emailOptions.html = html
        }
        if (text) {
            emailOptions.text = text
        }

        const { data, error } = await resend.emails.send(emailOptions)

        if (error) {
            console.error('Error sending email:', error)
            return { success: false, error: error.message }
        }

        console.log('Email sent successfully:', data?.id)
        return { success: true, data }
    } catch (error) {
        console.error('Error sending email:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Verifica si un usuario es nuevo (primera vez que se autentica)
 * En Supabase, cuando un usuario se registra por primera vez con OAuth:
 * - created_at y last_sign_in_at son muy similares (diferencia de minutos)
 * - Si la diferencia es menor a 5 minutos, consideramos que es nuevo
 */
export function isNewUser(user: EmailUser): boolean {
    try {
        // Si no tenemos las fechas, asumimos que es nuevo para seguridad
        if (!(user as any).created_at || !(user as any).last_sign_in_at) {
            return true
        }

        const createdAt = new Date((user as any).created_at)
        const lastSignIn = new Date((user as any).last_sign_in_at)

        // Diferencia en minutos
        const diffInMinutes = Math.abs(lastSignIn.getTime() - createdAt.getTime()) / (1000 * 60)

        // Si la diferencia es menor a 5 minutos, consideramos que es nuevo
        return diffInMinutes < 5
    } catch (error) {
        console.error('Error checking if user is new:', error)
        // En caso de error, mejor asumir que es nuevo
        return true
    }
}
