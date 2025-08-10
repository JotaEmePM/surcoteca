# 📧 Sistema de Correos - Surcoteca (SMTP)

Sistema de envío de correos usando **SMTP (nodemailer)** en Next.js.

## 🚀 Configuración Rápida

### 1. Variables de Entorno

Agrega en tu `.env.local`:

```bash
SMTP_HOST=smtp.tudominio.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=clave_segura
SMTP_FROM="Surcoteca <noreply@tudominio.com>"
SMTP_REPLY_TO=soporte@tudominio.com
# Opcional si necesitas forzar secure cuando no es 465
SMTP_SECURE=false
```

### 2. Instalación

```bash
pnpm add nodemailer
```

(Ya instalado en el proyecto)

## 🧪 Probar el Sistema

Mantiene los mismos endpoints (`/api/email`).

Ejemplo welcome:
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "user": {"id": "test_123","email": "tu-email@ejemplo.com","user_metadata": {"name": "Tu Nombre"}}
  }'
```

Custom:
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "custom",
    "to": "destinatario@ejemplo.com",
    "subject": "Asunto",
    "html": "<h1>Hola</h1>",
    "text": "Hola"
  }'
```

## 📁 Archivos Relevantes

```
app/
  lib/
    smtp.ts            # Config SMTP/nodemailer
    email-service.ts   # Lógica de envío
    email-templates.tsx
  api/email/route.ts   # Endpoint API
  auth/callback/route.ts
```

## ✨ Notas
- Eliminado Resend y sus tags. Si necesitas métricas considera un servicio como SendGrid / Mailgun o logs + base de datos.
- Usa puertos 587 (STARTTLS), 465 (SSL) o 25 según proveedor.
- Asegura SPF/DKIM/DMARC en tu DNS para mejor deliverability.

## 🐛 Troubleshooting
- "SMTP not configured": faltan variables.
- Timeout: revisa firewall / puerto / credenciales.
- Auth failed: verifica usuario/clave y métodos permitidos (LOGIN/PLAIN/OAuth2).

## Próximos pasos
- Añadir plantillas adicionales
- Manejo de colas (BullMQ / Cloud Tasks) para envíos masivos
- Tracking de aperturas (pixel) y clicks (redirección intermedia)
