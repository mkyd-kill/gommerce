"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Product } from "@/types/product";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/product/all");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((prod) => (
        <div className="border p-4 rounded-shadow" key={prod.id}>
          <h2 className="text-lg font-bold">{prod.name}</h2>
          <p>{prod.description}</p>
          <p className="text-blue-600 font-semibold">${prod.price}</p>
          <button className="bg-green-600 text-white px-4 py-1 mt-2 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
