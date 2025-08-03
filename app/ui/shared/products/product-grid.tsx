import Product from "./product";
import { Product as ProductData } from "@/app/lib/models/product";


interface ProductGridProps {
    productProps: ProductData[];
}

export default function ProductGrid({ productProps }: ProductGridProps) {
    return <>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {Array.isArray(productProps) &&
                productProps.map((product, index) => (
                    <Product key={index} {...product} />
                ))}
        </div>
    </>
}