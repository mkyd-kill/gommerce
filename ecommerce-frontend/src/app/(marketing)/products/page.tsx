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

  // live search for product filtering
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setQueryProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setQueryProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto mb-2">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <input
              className="w-full border border-[#d0d5dd] rounded-2xl py-3 px-4 text-black pr-10 focus:outline-none focus:ring-2 focus:ring-[#66004b]"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
              <Image src={search} alt="Search" width={20} height={20} />
            </span>
          </div>
        </form>
      </div>

      <div>
        {searchQuery && queryProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <section className="py-2">
            <Deals
              products={queryProducts.length > 0 ? queryProducts : products}
            />
          </section>
        )}
      </div>
    </div>
  );
}
