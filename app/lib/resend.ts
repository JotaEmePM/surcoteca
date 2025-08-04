import { Resend } from 'resend'

const resendApiKey = process.env.NEXT_RESEND_API_KEY

if (!resendApiKey) {
    console.warn('NEXT_RESEND_API_KEY not configured')
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null

export const RESEND_CONFIG = {
    from: process.env.NEXT_RESEND_TO || '', // Cambia por tu dominio verificado
    replyTo: process.env.NEXT_RESEND_REPLY_TO || '', // Cambia por tu email de soporte
}
