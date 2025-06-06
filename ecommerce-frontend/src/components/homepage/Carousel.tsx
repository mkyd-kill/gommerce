"use client";
import { useState, useEffect } from "react";
import { ProductModel } from "@/types/product";
import { Carousel } from "react-responsive-carousel";

interface Props {
    products: ProductModel[];
}

export const CarouselPage = ({products}: Props) => {
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [products.length]);

    const currentProduct = products[current];

    return (
        <Carousel></Carousel>
    )
}