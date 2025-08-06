import type { Metadata } from 'next'

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
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-full max-w-md p-6">
                aaa
                {children}
            </div>
        </div>
    )
}