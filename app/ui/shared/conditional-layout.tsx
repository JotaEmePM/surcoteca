'use client'

import { usePathname } from 'next/navigation'
import Header from './header'

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Rutas que no deben mostrar el header
  const noHeaderRoutes = ['/login', '/register', '/signup']
  const shouldShowHeader = !noHeaderRoutes.some(route => pathname.startsWith(route))

  if (shouldShowHeader) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-background dark group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          {children}
        </div>
      </div>
    )
  }

  // Para rutas de login, devolver solo los children sin header
  return <>{children}</>
}
