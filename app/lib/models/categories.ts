export interface Category {
    id: string
    name: string
    description: string
    order: number
    slug: string
    hasProducts?: boolean
    hasDiscounts?: boolean
}