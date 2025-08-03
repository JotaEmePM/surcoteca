import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";

import "./globals.css";
import Header from "./ui/shared/header";
import { getUnderConstructionStatus } from "./lib/env-data";
import UnderConstruction from "./components/under-construction";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Surcoteca",
  description: "Tienda online de vinilos, encuentra tus favoritos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={` ${spaceGrotesk.variable} antialiased`}>
      
        {getUnderConstructionStatus() ? (
          <UnderConstruction />
        ) : (
          <div className="relative flex size-full min-h-screen flex-col bg-background dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
              <Header />
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
