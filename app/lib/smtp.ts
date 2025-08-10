import nodemailer, { Transporter } from 'nodemailer'

// Definimos el tipo del transporter usando la interfaz oficial
let transporter: Transporter | null = null

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpDebug = process.env.SMTP_DEBUG === 'true'

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn('SMTP environment variables not fully configured (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)')
}

export const SMTP_CONFIG = {
    from: process.env.SMTP_FROM || '',
    replyTo: process.env.SMTP_REPLY_TO || '',
}

if (smtpHost && smtpPort && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465 || process.env.SMTP_SECURE === 'true',
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        logger: smtpDebug,
        debug: smtpDebug,
    })

    // Verificación opcional de la conexión
    transporter.verify().then(() => {
        if (smtpDebug) console.log('SMTP connection verified OK')
    }).catch(err => {
        console.error('SMTP verify failed:', err)
    })
}

export { transporter }
