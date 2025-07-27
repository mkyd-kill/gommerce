"use client";
import { FetchAllProducts } from "@/services/productAPI";
import { useEffect, useState } from "react";
import { ProductModel } from "@/types/product";
import { Deals } from "@/components/homepage/Deals";
import Image from "next/image";
import search from "../../../assets/search.svg";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [queryProducts, setQueryProducts] = useState<ProductModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const res = await FetchAllProducts();
      setProducts(res);
    };
    getProducts();
  }, []);

  const handleProductSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <div className="max-w-xl mx-auto mt-3 shadow bg-white rounded-xl">
        <form onSubmit={handleProductSearch} method="get">
          <div className="relative">
            <input
              className="w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black pr-10"
              type="text"
              placeholder="product search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer mr-3">
              <Image src={search} alt="product search" />
            </span>
          </div>
        </form>
      </div>

      {queryProducts.length > 0 ? (
        <h3>Products Found</h3>
      ) : (
        <section className="py-2">
          <Deals products={products} />
        </section>
      )}
    </div>
  );
}
