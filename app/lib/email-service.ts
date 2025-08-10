import { render } from '@react-email/render'
import React from 'react'
import { transporter, SMTP_CONFIG } from './smtp'
import { WelcomeEmail } from './email-templates'

const envelopeFrom = process.env.SMTP_ENVELOPE_FROM

export interface EmailUser {
    id: string
    email: string
    user_metadata: {
        name?: string
        full_name?: string
        avatar_url?: string
        provider?: string
    }
    created_at?: string
    last_sign_in_at?: string
}/**
 * Envía un correo de bienvenida a un nuevo usuario
 */
export async function sendWelcomeEmail(user: EmailUser) {
    if (!transporter) {
        console.warn('SMTP transporter not configured, skipping welcome email')
        return { success: false, error: 'SMTP not configured' }
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
        const info = await transporter.sendMail({
            from: SMTP_CONFIG.from,
            to: user.email,
            replyTo: SMTP_CONFIG.replyTo,
            envelope: envelopeFrom ? { from: envelopeFrom, to: [user.email] } : undefined,
            subject: '¡Bienvenido a Surcoteca! 🎉',
            html: emailHtml,
        })

        console.log('Welcome email sent successfully (SMTP):', info.messageId)
        return { success: true, data: { id: info.messageId } }
    } catch (error) {
        console.error('Error sending welcome email (SMTP):', error)
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
    tags = [], // Ignorado en SMTP por ahora
}: {
    to: string | string[]
    subject: string
    html?: string
    text?: string
    tags?: Array<{ name: string; value: string }>
}) {
    if (!transporter) {
        console.warn('SMTP transporter not configured, skipping email')
        return { success: false, error: 'SMTP not configured' }
    }

    // Asegurar que tenemos al menos text o html
    if (!html && !text) {
        return { success: false, error: 'Either html or text must be provided' }
    }

    try {
        const toArray = Array.isArray(to) ? to : [to]
        const info = await transporter.sendMail({
            from: SMTP_CONFIG.from,
            to: toArray,
            replyTo: SMTP_CONFIG.replyTo,
            envelope: envelopeFrom ? { from: envelopeFrom, to: toArray } : undefined,
            subject,
            html,
            text,
        })

        console.log('Email sent successfully (SMTP):', info.messageId)
        return { success: true, data: { id: info.messageId } }
    } catch (error) {
        console.error('Error sending email (SMTP):', error)
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
        if (!user.created_at || !user.last_sign_in_at) {
            return true
        }

        const createdAt = new Date(user.created_at)
        const lastSignIn = new Date(user.last_sign_in_at)

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