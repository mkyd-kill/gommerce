"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { FetchProductById } from "@/services/productAPI";
import { ProductModel } from "@/types/product";
import { toast } from "react-toastify";
import Image from "next/image";
import placeholder from "../../../../assets/hoodie.svg";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await FetchProductById(productId as string);
        setProduct(data);
      } catch {
        toast.error("Product not found.");
      }
    };
    loadProduct();
  }, [productId]);

  if (!product) return <p className="p-4">Loading product...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <Image src={product.image || placeholder} alt="Placeholder" width={400} height={400} />

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-xl text-[#66004b] font-bold my-2">
            Kshs. {product.price.toLocaleString()}
          </p>

          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
          <div className="my-3">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < product.rating ? "text-yellow-500" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>

          <button
            className="bg-[#66004b] text-white px-4 py-2 rounded hover:bg-[#55003f]"
            onClick={() => {addToCart(product)}}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
