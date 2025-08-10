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
                {/* Sidebar inline */}
                <SidebarProvider>
                    <NavigationSidebar />
                </SidebarProvider>
                {/* Contenido */}
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </>
    )
}