"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductModel } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import placeholder from "../../../assets/featurechair.svg";
import { toast } from "react-toastify";
import { getProductById } from "@/services/productAPI";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        toast.error("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Top: Image + Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white border rounded p-4 flex justify-center items-center">
          <Image
            src={product.image || placeholder}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="bg-white p-4 rounded border">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl text-[#66004b] font-bold mb-2">
            Kshs. {product.price.toLocaleString()}
          </p>

          <div className="flex flex-col gap-1 mb-4">
            <p className="text-sm text-gray-500">
              Category: <span className="font-medium">{product.category}</span>
            </p>
            <p className="text-sm text-gray-500">
              Stock: <span className="font-medium">{product.stock}</span>
            </p>
            <p className="text-sm text-gray-500">
              Rating:{" "}
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </p>
          </div>

          <button
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantityInCart: 1,
              });
              toast.success("Added to cart");
            }}
            className="bg-[#66004b] text-white px-4 py-2 rounded hover:bg-[#55003f]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* You can dynamically map real related items here */}
          <div className="bg-gray-100 h-32 flex items-center justify-center rounded">
            Item 1
          </div>
          <div className="bg-gray-100 h-32 flex items-center justify-center rounded">
            Item 2
          </div>
          <div className="bg-gray-100 h-32 flex items-center justify-center rounded">
            Item 3
          </div>
          <div className="bg-gray-100 h-32 flex items-center justify-center rounded">
            Item 4
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        <div className="bg-white p-4 border rounded">
          <p className="text-sm text-gray-500">No reviews yet.</p>
        </div>

        {isLoggedIn() && (
          <div className="mt-4 bg-white p-4 border rounded">
            <h3 className="font-semibold mb-2">Write a Review</h3>
            <textarea
              rows={4}
              className="w-full border rounded p-2 text-sm mb-2"
              placeholder="Write your review here..."
            />
            <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}