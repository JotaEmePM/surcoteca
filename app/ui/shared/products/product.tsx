import { Product as ProductItem } from "@/app/lib/models/product";
import React from "react";

export default function Product(productProps: ProductItem) {
    return (<>{productProps.label}</>)
}