/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FetchProductById, UpdateProductById } from "@/services/productAPI";
import { Input, TextArea } from "@/components/resuables/form-inputs";
import { ProductModel } from "@/types/product";
import { toast } from "react-toastify";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Partial<ProductModel | null>>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await FetchProductById(id as string);
        setProduct(data);
      } catch {
        toast.error("Product not found.");
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      UpdateProductById(id as string, product);
      setProduct(null)
      router.push("/admin/products");
      toast.success("product updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-3 shadow bg-white p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Update Product ID#{id}</h3>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Input
            label="Product Name"
            name="name"
            type="text"
            value={product?.Name}
            onChange={handleChange}
          />

          <Input
            label="Product Price"
            name="price"
            type="number"
            value={product?.Price}
            onChange={handleChange}
          />

          <Input
            label="Product Stock"
            name="stock"
            type="number"
            value={product?.Stock}
            onChange={handleChange}
          />

          <Input
            label="Product Rating (1–5)"
            name="rating"
            type="number"
            value={product?.Rating}
            onChange={handleChange}
          />

          <TextArea
            label="Product Description"
            name="description"
            type="text"
            value={product?.Description}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex justify-center items-center px-[18px] py-2.5 rounded-lg bg-[#66004b] text-white font-semibold border border-[#66004b] hover:bg-[#55003f] transition-colors cursor-pointer"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
