# 📧 Sistema de Correos - Surcoteca

Un sistema completo para envío de correos electrónicos usando **Resend** en Next.js.

## 🚀 Configuración Rápida

### 1. Configurar Resend

1. Crea una cuenta en [Resend](https://resend.com)
2. Obtén tu API Key desde el dashboard
3. Agrega la variable de entorno:

```bash
# .env
NEXT_RESEND_API_KEY=re_tu_api_key_aqui
```

### 2. Configurar Dominio (Opcional pero Recomendado)

Para evitar que los correos vayan a spam:

1. En Resend, ve a "Domains" y agrega tu dominio
2. Configura los registros DNS requeridos
3. Actualiza la configuración en `app/lib/resend.ts`:

```typescript
export const RESEND_CONFIG = {
  from: 'Surcoteca <noreply@tudominio.com>',
  replyTo: 'support@tudominio.com',
}
```

## 🧪 Probar el Sistema

### Método 1: Script de Prueba

```bash
# 1. Asegúrate que el servidor esté corriendo
pnpm dev

# 2. En otra terminal, edita test-email.js y cambia el email
# 3. Ejecuta el script
node test-email.js
```

### Método 2: Autenticación Real

1. Ve a `/login` en tu aplicación
2. Autentica con GitHub/Google
3. El correo de bienvenida se enviará automáticamente

### Método 3: API Directa

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "user": {
      "id": "test_123",
      "email": "tu-email@ejemplo.com",
      "user_metadata": {"name": "Tu Nombre"}
    }
  }'
```

## 📁 Archivos Creados

```
app/
├── lib/
│   ├── resend.ts              # Configuración de Resend
│   ├── email-service.ts       # Funciones principales
│   └── email-templates.tsx    # Plantillas de correo
├── api/
│   └── email/
│       └── route.ts          # Endpoint API
└── auth/
    └── callback/
        └── route.ts          # Modificado para enviar bienvenida

test-email.js                 # Script de prueba
RESEND_GUIDE.md              # Documentación completa
```

## ✨ Funcionalidades

- ✅ **Correo de Bienvenida Automático**: Se envía al registrarse por primera vez
- ✅ **API REST**: Endpoint `/api/email` para correos personalizados  
- ✅ **Plantillas React**: Usando React Email para diseños profesionales
- ✅ **Detección de Nuevos Usuarios**: Evita enviar duplicados
- ✅ **Error Handling**: No afecta la autenticación si falla el correo
- ✅ **Tags y Tracking**: Para métricas en Resend
- ✅ **TypeScript**: Completamente tipado

## 🎯 Próximos Pasos

1. **Personalizar Plantillas**: Edita `email-templates.tsx` con tu diseño
2. **Configurar Dominio**: Para mejor deliverability
3. **Agregar Más Plantillas**: Reset password, notificaciones, etc.
4. **Métricas**: Configurar webhooks de Resend para tracking

## 🐛 Troubleshooting

**❌ "Resend not configured"**
- Verifica que `NEXT_RESEND_API_KEY` esté en `.env`
- Reinicia el servidor de desarrollo

**📧 Correos van a spam**
- Configura un dominio verificado en Resend
- Agrega registros SPF, DKIM y DMARC

**🐍 Error de compilación**
- Ejecuta `pnpm add resend @react-email/render @react-email/components`

---

**¿Necesitas ayuda?** Revisa `RESEND_GUIDE.md` para documentación completa.
