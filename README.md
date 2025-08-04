# Surcoteca - Tienda de Vinilos

Este es un proyecto de [Next.js](https://nextjs.org) con autenticación Supabase y OAuth con GitHub.

## 🚀 Getting Started

### 1. Configurar variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.local.example .env.local
```

Edita `.env.local` con tus valores reales:

```bash
# Environment
UNDER_CONSTRUCTION=false

# Site URL (importante para OAuth redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # En desarrollo
# NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app  # En producción

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 2. Instalar dependencias y ejecutar

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔐 Configuración de Supabase OAuth

### En Supabase:
1. Ve a Authentication > Providers
2. Habilita GitHub
3. Configura las URLs:
   - **Site URL**: `https://tu-dominio.vercel.app` (producción)
   - **Redirect URLs**: `https://tu-dominio.vercel.app/auth/callback`

### En GitHub:
1. Ve a Settings > Developer settings > OAuth Apps  
2. Crea una nueva OAuth App:
   - **Authorization callback URL**: `https://tu-proyecto.supabase.co/auth/v1/callback`
3. Copia Client ID y Client Secret a Supabase

## 🚀 Deploy en Vercel

### Variables de entorno requeridas en Vercel:
```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
UNDER_CONSTRUCTION=false
```

### Configurar en Vercel:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Añade todas las variables mencionadas arriba
4. Redeploy el proyecto

## 🛠️ Tecnologías

- **Next.js 15** - Framework React
- **Supabase** - Backend como servicio
- **@supabase/ssr** - Autenticación server-side  
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático
- **GitHub OAuth** - Autenticación social

## 📱 Rutas disponibles

- `/` - Página principal
- `/login` - Iniciar sesión con GitHub
- `/profile` - Perfil de usuario (Client Component)
- `/server-profile` - Perfil de usuario (Server Component)
- `/auth/callback` - Callback de OAuth

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
