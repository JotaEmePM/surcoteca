import { SupabaseClient } from '@supabase/supabase-js'
import { createClient, Database } from './supabase'
import { Category } from '../models/categories'

export default class SupabaseCategory {
    supabase: SupabaseClient<Database> | null

    constructor() {
        this.supabase = createClient()

        if (!this.supabase)
            throw new Error('Problema de acceso a los datos')
    }

    public async getCategories(): Promise<Category[]> {
        const { data, error } = await this.supabase!.from('categories').select('*')

        if (error) {
            console.error('Error al obtener categorias', error)
            return []
        }

        return data
    }

    public async getCategoryBySlug(slug: string) {
        const { data, error } = await this.supabase!
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single()


        if (error) {
            console.error('Error al obtener informacion sobre la categoria', error)
            return []
        }

        return data
    }


}