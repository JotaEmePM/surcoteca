// Eliminamos import type para evitar error de declaración
// import type { Transporter } from 'nodemailer'

// Definimos una interfaz mínima para el transporter
interface TransporterLike {
    sendMail: (options: any) => Promise<any>
}

let nodemailer: any
try {
    nodemailer = require('nodemailer')
} catch (e) {
    // ignore
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn('SMTP environment variables not fully configured (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)')
}

export const SMTP_CONFIG = {
    from: process.env.SMTP_FROM || '',
    replyTo: process.env.SMTP_REPLY_TO || '',
}

let transporter: TransporterLike | null = null

if (smtpHost && smtpPort && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465 || process.env.SMTP_SECURE === 'true',
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    })
}

export { transporter }
