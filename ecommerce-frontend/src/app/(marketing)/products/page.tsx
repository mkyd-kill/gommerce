"use client";
import { FetchAllProducts } from "@/services/productAPI";
import { useEffect, useState } from "react";
import { ProductModel } from "@/types/product";
import { Deals } from "@/components/homepage/Deals";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await FetchAllProducts();
      setProducts(res);
    };
    getProducts();
  }, []);
  return (
    <div className="container">
      <div className="search-header"></div>

      <section className="py-2">
        <Deals products={products} />
      </section>
    </div>
  );
}
