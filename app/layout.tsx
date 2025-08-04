import type { Metadata } from "next";

import "./globals.css";
import { getUnderConstructionStatus } from "./lib/env-data";
import UnderConstruction from "./components/under-construction";
import ConditionalLayout from "./ui/shared/conditional-layout";

export const metadata: Metadata = {
  title: "Surcoteca",
  description: "Tienda online de vinilos, encuentra tus favoritos",
  themeColor: "#161d1c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`antialiased`}>
      
        {getUnderConstructionStatus() ? (
          <UnderConstruction />
        ) : (
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        )}
      </body>
    </html>
  );
}
