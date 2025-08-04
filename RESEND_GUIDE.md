# Sistema de Correos con Resend

Este sistema permite enviar correos electrónicos usando Resend de forma sencilla y eficiente.

## Configuración

### Variables de Entorno

Asegúrate de tener estas variables en tu archivo `.env`:

```bash
NEXT_RESEND_API_KEY=tu_api_key_de_resend
```

### Configuración de Dominio

En el archivo `app/lib/resend.ts`, actualiza la configuración:

```typescript
export const RESEND_CONFIG = {
  from: 'Surcoteca <noreply@tudominio.com>', // Cambia por tu dominio verificado
  replyTo: 'support@tudominio.com', // Cambia por tu email de soporte
}
```

## Funcionalidades Implementadas

### 1. Correo de Bienvenida Automático

Cuando un usuario se autentica por primera vez (OAuth con GitHub/Google), automáticamente se le envía un correo de bienvenida.

**Cómo funciona:**
- Se detecta en `app/auth/callback/route.ts`
- Se verifica si es un usuario nuevo con `isNewUser()`
- Se envía el correo usando `sendWelcomeEmail()`

### 2. API Endpoint para Correos

**Endpoint:** `POST /api/email`

#### Enviar Correo de Bienvenida

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "user": {
      "id": "user_id",
      "email": "usuario@ejemplo.com",
      "user_metadata": {
        "name": "Nombre Usuario"
      }
    }
  }'
```

#### Enviar Correo Personalizado

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "custom",
    "to": "usuario@ejemplo.com",
    "subject": "Asunto del correo",
    "html": "<h1>Hola!</h1><p>Este es un correo de prueba.</p>",
    "text": "Hola! Este es un correo de prueba.",
    "tags": [
      {"name": "category", "value": "test"}
    ]
  }'
```

### 3. Funciones Disponibles

#### `sendWelcomeEmail(user)`

Envía un correo de bienvenida usando la plantilla predefinida.

```typescript
import { sendWelcomeEmail } from '@/app/lib/email-service'

const result = await sendWelcomeEmail({
  id: 'user_id',
  email: 'usuario@ejemplo.com',
  user_metadata: {
    name: 'Nombre Usuario'
  }
})

if (result.success) {
  console.log('Correo enviado:', result.data)
} else {
  console.error('Error:', result.error)
}
```

#### `sendEmail(options)`

Función genérica para enviar cualquier tipo de correo.

```typescript
import { sendEmail } from '@/app/lib/email-service'

const result = await sendEmail({
  to: 'usuario@ejemplo.com',
  subject: 'Asunto del correo',
  html: '<h1>Contenido HTML</h1>',
  text: 'Contenido en texto plano',
  tags: [
    { name: 'category', value: 'notification' }
  ]
})
```

#### `isNewUser(user)`

Verifica si un usuario es nuevo (registrado en los últimos 5 minutos).

```typescript
import { isNewUser } from '@/app/lib/email-service'

if (isNewUser(user)) {
  // Enviar correo de bienvenida
}
```

## Plantillas de Correo

Las plantillas están en `app/lib/email-templates.tsx` usando React Email.

### Crear Nueva Plantilla

```typescript
export const MiPlantilla: React.FC<{data: any}> = ({ data }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text>¡Hola {data.name}!</Text>
        {/* Tu contenido aquí */}
      </Container>
    </Body>
  </Html>
)
```

### Usar la Plantilla

```typescript
import { render } from '@react-email/render'
import { MiPlantilla } from './email-templates'

const emailHtml = render(MiPlantilla({ data: { name: 'Usuario' } }))

await sendEmail({
  to: 'usuario@ejemplo.com',
  subject: 'Mi correo',
  html: emailHtml
})
```

## Testing

### Probar el Sistema

1. **Autenticación:** Regístrate con GitHub/Google para probar el correo de bienvenida automático.

2. **API:** Usa el endpoint `/api/email` para probar correos personalizados.

3. **Desarrollo Local:** Los correos se enviarán realmente, así que usa emails de prueba.

### Debugging

Los logs aparecen en la consola del servidor:

- ✅ `Welcome email sent successfully: email_id`
- ❌ `Error sending welcome email: error_message`
- ⚠️ `Resend not configured, skipping welcome email`

## Próximas Mejoras

- [ ] Plantilla para reset de contraseña
- [ ] Plantilla para notificaciones de pedidos
- [ ] Sistema de colas para emails
- [ ] Métricas de apertura y clicks
- [ ] Templates más avanzados con componentes reutilizables

## Notas Importantes

1. **Dominio Verificado:** Asegúrate de verificar tu dominio en Resend para evitar que los correos vayan a spam.

2. **Rate Limits:** Resend tiene límites de envío según tu plan.

3. **Error Handling:** El sistema no falla la autenticación si hay problemas con el correo.

4. **Logs:** Todos los envíos se registran en los logs del servidor para debugging.
