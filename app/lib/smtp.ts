import nodemailer, { Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

// Definimos el tipo del transporter usando la interfaz oficial
let transporter: Transporter | null = null

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpDebug = process.env.SMTP_DEBUG === 'true'

// Variables DKIM
const dkimDomain = process.env.SMTP_DKIM_DOMAIN
const dkimSelector = process.env.SMTP_DKIM_SELECTOR
let dkimPrivateKey = process.env.SMTP_DKIM_PRIVATE_KEY

// Normaliza la private key (permitir que venga con \n escapados o en base64 sin cabeceras)
if (dkimPrivateKey) {
    // Reemplazar secuencias \n por saltos reales
    dkimPrivateKey = dkimPrivateKey.replace(/\\n/g, '\n').trim()
    // Si parece base64 sin cabeceras y no comienza con -----BEGIN, no la tocamos aquí.
}

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn('SMTP environment variables not fully configured (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)')
}

if ((dkimDomain || dkimSelector || dkimPrivateKey) && !(dkimDomain && dkimSelector && dkimPrivateKey)) {
    console.warn('DKIM variables incompletas. Se requieren: SMTP_DKIM_DOMAIN, SMTP_DKIM_SELECTOR, SMTP_DKIM_PRIVATE_KEY')
}

export const SMTP_CONFIG = {
    from: process.env.SMTP_FROM || '',
    replyTo: process.env.SMTP_REPLY_TO || '',
}

if (smtpHost && smtpPort && smtpUser && smtpPass) {
    type TransportOptions = SMTPTransport.Options & {
        dkim?: {
            domainName: string
            keySelector: string
            privateKey: string
        }
    }
    const transportOptions: TransportOptions = {
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465 || process.env.SMTP_SECURE === 'true',
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        logger: smtpDebug,
        debug: smtpDebug,
    }

    if (dkimDomain && dkimSelector && dkimPrivateKey) {
        transportOptions.dkim = {
            domainName: dkimDomain,
            keySelector: dkimSelector,
            privateKey: dkimPrivateKey,
        }
    }

    transporter = nodemailer.createTransport(transportOptions)

    transporter.verify().then(() => {
        if (smtpDebug) console.log('SMTP connection verified OK' + (transportOptions.dkim ? ' (DKIM enabled)' : ''))
    }).catch(err => {
        console.error('SMTP verify failed:', err)
    })
}

export { transporter }
