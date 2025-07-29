import { Product as ProductData } from "../lib/models/product"
import ProductGrid from "../ui/shared/products/product-grid"


export default function NewArrivals() {
    const dataProducts: ProductData[] = [
        {
            id: '1',
            label: 'The Bends',
            author: 'Radiohead',
            discount: 0,
            image: 'https://placehold.co/100x100',
            price: 1000
        },
        {
            id: '2',
            label: 'Kid A',
            author: 'Radiohead',
            discount: 0,
            image: 'https://placehold.co/100x100',
            price: 23000
        },
        {
            id: '3',
            label: 'OK Computer',
            author: 'Radiohead',
            discount: 20000,
            image: 'https://placehold.co/100x100',
            price: 23000
        }
    ]
    return <>
        <h2 className="text-2xl">New Arrivals</h2>
        <ProductGrid productProps={dataProducts} />
    </>
}