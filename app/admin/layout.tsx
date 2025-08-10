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
            <div className="min-h-screen bg-background flex">
                {/* El menú ocupa un ancho propio y no se contrae */}
                <aside className="shrink-0">
                    <SidebarProvider>
                        <NavigationSidebar />
                    </SidebarProvider>
                </aside>
                {/* El resto del espacio se asigna al contenido */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </>
    )
}