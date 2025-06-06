"use client";
import { useEffect, useState } from "react";
import { ProductModel } from "@/types/product";
import SearchBar from "@/components/catalog/SearchBar";
import { useCart } from "@/context/CartContext";
import { fetchAllProducts } from "@/services/productAPI";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
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
            <button
              className="bg-green-600 text-white px-4 py-1 mt-2 rounded cursor-pointer"
              onClick={() => {
                addToCart({
                  id: prod.id,
                  name: prod.name,
                  price: prod.price,
                  image: prod.image,
                  quantityInCart: 1,
                });
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
