"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/useAuth";
import { fetchProductById } from "@/services/productAPI";
import { ProductModel } from "@/types/product";
import { toast } from "react-toastify";
import Image from "next/image";
import placeholder from "../../../../assets/hoodie.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const { addToCart } = useCart();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id as string);
        setProduct(data);
      } catch {
        toast.error("Product not found.");
      }
    };
    loadProduct();
  }, [id]);

  const handleReviewSubmit = async () => {
    try {
      const res = await fetch(`/api/products/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: reviewText,
          rating: reviewRating,
          user_email: user?.email,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Review submitted!");
      setReviewText("");
      setReviewRating(5);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  if (!product) return <p className="p-4">Loading product...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <Image src={placeholder} alt="Placeholder" width={400} height={400} />

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
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Write a Review</h2>
        {isLoggedIn() ? (
          <div className="bg-white border p-4 rounded">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded p-2 mb-2"
              rows={4}
            />
            <div className="flex items-center gap-2 mb-3">
              <label>Rating:</label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleReviewSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Login to write a review.</p>
        )}
      </div>
    </div>
  );
}
