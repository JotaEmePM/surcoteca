import Product from "./product";
import { Product as ProductData } from "@/app/lib/models/product";


interface ProductGridProps {
    productProps: ProductData[];
}

export default function ProductGrid({ productProps }: ProductGridProps) {
    return <>
        {Array.isArray(productProps) &&
            productProps.map((product, index) => (
                <Product key={index} {...product} />
            ))}
    </>
}