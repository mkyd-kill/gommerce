"use client";
import { useEffect, useState } from "react";
import { ProductModel } from "@/types/product";
import { getAllProductAPI } from "@/services/productAPI";
import SearchBar from "@/components/catalog/SearchBar";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProductAPI();
      setProducts(res);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((prod) => (
          <div className="border p-4 rounded-xl" key={prod.id}>
            <h2 className="text-lg font-bold">{prod.name}</h2>
            <p>{prod.description}</p>
            <p className="text-blue-600 font-semibold">
              Kshs. {prod.price.toLocaleString()}
            </p>
            <button className="bg-green-600 text-white px-4 py-1 mt-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
