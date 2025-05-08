"use client";
import { ProductModel } from "@/types/product";
import RelatedProduct from "@/components/related/Related";
import { useState, useEffect } from "react";

export default function ProductDetails(id: number) {
    const [product, setProduct] = useState<ProductModel[]>([]);
    return (
        <div className="my-4">
            <RelatedProduct />
        </div>
    )
}