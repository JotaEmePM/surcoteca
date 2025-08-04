import { Product as ProductItem } from "@/app/lib/models/product";
import Link from "next/link";
import React from "react";

export default function Product(productProps: ProductItem) {
    return (<>
        <div className="flex flex-col gap-3 pb-3 hover:bg-[#244740] hover:rounded-2xl transition-all duration-200">
            <Link href={`/products/${productProps.id}`} className="flex flex-col gap-2">
                <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: 'url("https://placehold.co/100x100")' }}>
                </div>
                <div className="pl-1">
                    <p className="text-white text-base font-medium leading-normal">{productProps.label}</p>
                    <p className="text-[#93c8bd] text-sm font-normal leading-normal">{productProps.author}</p>
                    <p className="text-[#93c8bd] text-sm font-normal leading-normal">${productProps.price.toLocaleString('es-CL')}</p>
                </div>
            </Link>
        </div>
    </>)
}