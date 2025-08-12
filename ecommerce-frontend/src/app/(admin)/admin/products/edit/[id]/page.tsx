/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FetchProductById, UpdateProductById } from "@/services/product-api";
import { Input, TextArea } from "@/components/resuables/form-inputs";
import { ProductModel } from "@/types/product";
import { toast } from "react-toastify";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Partial<ProductModel>>({});
  const [loading, setLoading] = useState(false);

  // Fetch product on mount
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await FetchProductById(id as string);
        setProduct(data);
      } catch (err: any) {
        toast.error(err?.response?.data?.error || "Product not found.");
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await UpdateProductById(id as string, product);
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-3 shadow bg-white p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Update Product ID #{id}</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <Input
          label="Product Name"
          name="name"
          type="text"
          value={product?.Name || ""}
          onChange={handleChange}
        />

        <Input
          label="Product Price"
          name="price"
          type="number"
          value={product?.Price?.toString() || ""}
          onChange={handleChange}
        />

        <Input
          label="Product Stock"
          name="stock"
          type="number"
          value={product?.Stock?.toString() || ""}
          onChange={handleChange}
        />

        <Input
          label="Product Rating (1–5)"
          name="rating"
          type="number"
          value={product?.Rating?.toString() || ""}
          onChange={handleChange}
        />

        <TextArea
          label="Product Description"
          name="description"
          type="text"
          value={product?.Description || ""}
          onChange={handleChange}
          className="col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 mt-2 flex justify-center items-center px-6 py-2.5 rounded-lg bg-[#66004b] text-white font-semibold border border-[#66004b] hover:bg-[#55003f] transition-colors cursor-pointer"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}