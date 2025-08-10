# Guía de SMTP (Migración desde Resend)

Se migró el sistema de correos a **SMTP con nodemailer**.

## Variables de Entorno
```bash
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Surcoteca <noreply@tudominio.com>"
SMTP_REPLY_TO=soporte@tudominio.com
SMTP_SECURE=false
```

## Uso
La interfaz de `sendWelcomeEmail` y `sendEmail` se mantiene.

## Diferencias vs Resend
- Sin `tags` (puedes simular guardando metadata antes de enviar)
- Sin API Key centralizada; dependes de credenciales SMTP
- Menos métricas nativas; implementar tracking propio si se requiere

## Extensiones Sugeridas
- Guardar logs de envíos en tabla `email_logs`
- Implementar reintentos en fallos temporales (códigos 4xx de servidor SMTP)

## Ejemplo de Tracking Manual
```ts
// Antes de enviar
await db.insert('email_logs').values({ user_id, type: 'welcome', status: 'pending' })
// Después
await db.update('email_logs').set({ status: 'sent', provider_id: info.messageId })
```

## Siguientes pasos
1. Eliminar restos de documentación antigua sobre Resend
2. Agregar cola si se planean bursts de correos
3. Implementar verificación DMARC/SPF/DKIM
