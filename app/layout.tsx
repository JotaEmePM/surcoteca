import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import { getUnderConstructionStatus } from './lib/env-data'
import UnderConstruction from './components/under-construction'
import ConditionalLayout from './ui/shared/conditional-layout'

const comfortaa = localFont({
  src: '../public/fonts/Comfortaa-Regular.woff2',
  variable: '--font-comfortaa',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Surcoteca',
  description: 'Tienda online de vinilos, encuentra tus favoritos',
  themeColor: 'var(--background)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${comfortaa.variable} antialiased`}>
      
        {getUnderConstructionStatus() ? (
          <UnderConstruction />
        ) : (
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        )}
      </body>
    </html>
  )
}
