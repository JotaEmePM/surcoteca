import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Surcoteca',
  description: 'Iniciar sesión en Surcoteca',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </div>
  )
}