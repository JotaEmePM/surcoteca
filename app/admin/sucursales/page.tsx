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
                <div className="mt-4 overflow-x-auto rounded border bg-white/60">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Nombre</th>
                                <th className="px-4 py-2 font-semibold hidden sm:table-cell">Descripción</th>
                                <th className="px-4 py-2 font-semibold hidden md:table-cell">Dirección</th>
                                <th className="px-4 py-2 font-semibold">Virtual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sucursales.map((sucursal) => (
                                <tr key={sucursal.id} className="border-t last:border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 align-top">
                                        <div className="font-medium text-gray-900">{sucursal.name}</div>
                                        <div className="sm:hidden text-xs text-gray-500 mt-1 line-clamp-2">{sucursal.description}</div>
                                        <div className="md:hidden text-xs text-gray-400 mt-1">{sucursal.direccion}</div>
                                    </td>
                                    <td className="px-4 py-2 hidden sm:table-cell align-top text-gray-600 max-w-xs">
                                        <div className="line-clamp-2">{sucursal.description}</div>
                                    </td>
                                    <td className="px-4 py-2 hidden md:table-cell align-top text-gray-600">{sucursal.direccion}</td>
                                    <td className="px-4 py-2 align-top">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${sucursal.is_virtual ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                                            {sucursal.is_virtual ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!sucursales.length && (
                        <div className="py-6 text-center text-sm text-gray-500">No hay sucursales.</div>
                    )}
                </div>
            )}
        </section>
    );
}