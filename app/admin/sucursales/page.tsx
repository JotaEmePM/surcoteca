'use client';

import { useEffect, useState } from "react";
import { Sucursal } from "../../lib/models/store";
import SupabaseSucursal from "../../lib/supabase/supabase.sucursales";
import SkeletonTable from "@/ui/shared/components/SkeletonTable";

export default function Page() {

    const [loading, setLoading] = useState<boolean>(false);
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    const sucursalesService = new SupabaseSucursal()

    useEffect(() => {
        const fetchSucursales = async () => {
            setLoading(true);
            try {
                const data = await sucursalesService.getSucursales();
                setSucursales(data);
            } catch (error) {
                console.error('Error fetching sucursales:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSucursales();
    }, []);

    return (
        <section className="pl-4 py-4">
            <h1 className="text-2xl font-bold">Lista de Sucursales</h1>
            {loading ? (
                <SkeletonTable rows={6} columns={4} />
            ) : (
                <div className="mt-4 overflow-x-auto rounded border border-primary/40 bg-secondary/40 backdrop-blur">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-primary/90 text-primary-foreground">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Nombre</th>
                                <th className="px-4 py-2 font-semibold hidden sm:table-cell">Descripción</th>
                                <th className="px-4 py-2 font-semibold hidden md:table-cell">Dirección</th>
                                <th className="px-4 py-2 font-semibold">Virtual</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/20">
                            {sucursales.map((sucursal) => (
                                <tr key={sucursal.id} className="hover:bg-primary/10 transition-colors">
                                    <td className="px-4 py-2 align-top">
                                        <div className="font-medium text-foreground">{sucursal.name}</div>
                                        <div className="sm:hidden text-xs text-muted-foreground mt-1 line-clamp-2">{sucursal.description}</div>
                                        <div className="md:hidden text-xs text-muted-foreground mt-1">{sucursal.direccion}</div>
                                    </td>
                                    <td className="px-4 py-2 hidden sm:table-cell align-top text-muted-foreground max-w-xs">
                                        <div className="line-clamp-2">{sucursal.description}</div>
                                    </td>
                                    <td className="px-4 py-2 hidden md:table-cell align-top text-muted-foreground">{sucursal.direccion}</td>
                                    <td className="px-4 py-2 align-top">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${sucursal.is_virtual ? 'bg-primary/30 text-primary-foreground' : 'bg-muted text-foreground'}`}>
                                            {sucursal.is_virtual ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!sucursales.length && (
                        <div className="py-6 text-center text-sm text-muted-foreground">No hay sucursales.</div>
                    )}
                </div>
            )}
        </section>
    );
}