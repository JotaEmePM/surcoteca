export interface Category {
    id: string
    name: string,
    order: number
    hasProducts?: boolean
    hasDiscounts?: boolean
}