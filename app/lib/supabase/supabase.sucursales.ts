import { SupabaseClient } from "@supabase/supabase-js"

import { createClient, Database } from "./supabase"
import { Sucursal } from "../models/store"

export default class SupabaseSucursal {
    supabase: SupabaseClient<Database> | null

    constructor() {
        this.supabase = createClient()

        if (!this.supabase)
            throw new Error('Problema de acceso a los datos')
    }

    public async getSucursales(): Promise<Sucursal[]> {
        const { data, error } = await this.supabase!.from('stores').select('*')

        if (error) {
            console.error('Error al obtener sucursales', error)
            return []
        }

        return data
    }
}