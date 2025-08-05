import { SupabaseClient } from '@supabase/supabase-js'
import { Category } from '../models/categories'
import { Product } from '../models/product'
import { supabase, createClient } from './supabase'


const getCategories = async () => {
    const supabase = createClient()

    if (!supabase)
        throw new Error('Problema de acceso a los datos')

    const { data, error } = await supabase.from('categories').select('*')

    if (error) {
        console.error('Error al obtener categorias', error)
        return []
    }

    return data
}

// const getRandomProducts = (quantity: number): Product[] => {
//     const products: Product[] = []

//     return products
// }



export {
    getCategories,
    // getRandomProducts
}