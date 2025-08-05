import { SupabaseClient } from '@supabase/supabase-js'
import { Category } from '../models/categories'
import { Product } from '../models/product'
import { supabase, createClient } from './supabase'

const getProductsByCategory = async (categorySlug: string) => {
    const supabase = createClient()

    if (!supabase)
        throw new Error('Problema de accesos a los datos')

    const { data, error } = await supabase.from('categories')
        .select('*')
        .eq('slug', categorySlug)

    if (error || !data) throw new Error('No se encontraron datos')

    return data
}



// const getRandomProducts = (quantity: number): Product[] => {
//     const products: Product[] = []

//     return products
// }



