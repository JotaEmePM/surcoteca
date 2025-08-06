import { SupabaseClient } from '@supabase/supabase-js'
import { createClient, Database } from './supabase'

export type UserRole = {
    id: string
    user_roles: {
        id: string
        role_id: string
        roles: {
            id: string
            name: string
        }
    }[]

}

/*
{
    "id": "d666fc9d-9b5e-4db3-9a43-e53c86a50e31",
    "user_roles": [
        {
            "id": "19b27745-edf2-4ee3-91ba-8f659dda08ed",
            "roles": {
                "id": "364bacba-798b-46a6-8581-02c0b7d4ac53",
                "name": "user"
            },
            "role_id": "364bacba-798b-46a6-8581-02c0b7d4ac53"
        },
        {
            "id": "ace3723f-cf00-40d4-98f4-e400202a97a1",
            "roles": {
                "id": "2b9c2822-a7ed-460d-ab24-cc8bd88ee6f1",
                "name": "admin"
            },
            "role_id": "2b9c2822-a7ed-460d-ab24-cc8bd88ee6f1"
        }
    ]
}
 */

export default class SupabaseUser {
    supabase: SupabaseClient<Database> | null

    constructor() {
        this.supabase = createClient()

        if (!this.supabase)
            throw new Error('Problema de acceso a los datos')
    }

    public async userIsRole(id_user: string, role: string): Promise<boolean> {
        const { data, error } = await this.supabase!
            .from('user_roles')
            .select(`
                id,
                user_id,
                roles!inner(name)
            `)
            .eq('user_id', id_user)
            .eq('roles.name', role);

        if (error) {
            console.error('Error al obtener roles de usuario', error)
            return false
        }

        return data.length > 0
    }

    public async getUserRoles(id_user: string): Promise<UserRole | null> {
        const { data, error } = await this.supabase!.from('users').select(`
            id, user_roles (
                id,
                role_id,
                roles (
                    id,
                    name
                )
            )
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