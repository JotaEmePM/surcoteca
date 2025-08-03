import { Product as ProductData } from "../lib/models/product"
import ProductGrid from "../ui/shared/products/product-grid"


export default function Discounts() {
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
        },
        {
            id: '4',
            label: 'Hail to the Thief',
            author: 'Radiohead',
            discount: 20000,
            image: 'https://placehold.co/100x100',
            price: 23000
        },
        {
            id: '5',
            label: 'In Rainbows',
            author: 'Radiohead',
            discount: 20000,
            image: 'https://placehold.co/100x100',
            price: 23000
        }
    ]
    return <>
        <section className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">¡Precios de locos!</h2>
                <ProductGrid productProps={dataProducts} />
            </div>
        </section>
    </>
}