import { SupabaseClient } from '@supabase/supabase-js'
import { createClient, Database } from './supabase'

export type UserRole = {
    id: string
    user_roles: {
        id: string
        role_id: string
    }[]
    roles: {
        id: string
        name: string
    }[]
}

export default class SupabaseUser {
    supabase: SupabaseClient<Database> | null

    constructor() {
        this.supabase = createClient()

        if (!this.supabase)
            throw new Error('Problema de acceso a los datos')
    }

    public async getUserRoles(id_user: string): Promise<UserRole | null> {
        const { data, error } = await this.supabase!.from('user').select(`
            id,
            user_roles (id, role_id),
            roles (id, name)
        `)
            .eq('id', id_user)
            .single()

        if (error) {
            console.error('Error al obtener roles de usuario', error)
            return null
        }

        return data as unknown as UserRole
    }
}