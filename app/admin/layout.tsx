import type { Metadata } from 'next'
import NavigationSidebar from '../components/admin/NavigationSidebar'
import { SidebarProvider } from '../components/admin/Sidebar-Context'

export const metadata: Metadata = {
    title: 'Admin - Surcoteca',
    description: 'Panel de administración de Surcoteca',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Contenedor principal en fila: sidebar a la izquierda, contenido a la derecha */}
            <div className="min-h-screen bg-background flex">
                <SidebarProvider>
                    <NavigationSidebar />
                </SidebarProvider>
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </>
    )
}