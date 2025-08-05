import { SupabaseClient } from '@supabase/supabase-js'
import { createClient, Database } from './supabase'


export default class SupabaseUser {
    supabase: SupabaseClient<Database> | null

    constructor() {
        this.supabase = createClient()

        if (!this.supabase)
            throw new Error('Problema de acceso a los datos')
    }

    public async getUserRoles(id_user: string): Promise<any> {
        const { data, error } = await this.supabase!.from('user').select(`
            id,
            user_roles (id, role_id),
            roles (id, name)
        `)
            .eq('user.id', id_user)
            .single()

        if (error) {
            console.error('Error al obtener roles de usuario', error)
            return []
        }

        return data
    }
}