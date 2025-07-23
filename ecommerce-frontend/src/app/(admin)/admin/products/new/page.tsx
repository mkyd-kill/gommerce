/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    rating: "",
    quantity: "",
    featured: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a product image");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    Object.entries(formData).forEach(([key, val]) =>
      data.append(key, val.toString())
    );

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/products/create", data, {
        withCredentials: true,
      });
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        rating: "",
        quantity: "",
        featured: false,
      });
      setImage(null);
      setPreview(null);
      router.push("/products");
      toast.success("Product added successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-xs font-medium text-[#344054]">
              Product Name
            </label>
            <input
              className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#344054]">
              Product Price
            </label>
            <input
              className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
              type="number"
              placeholder="Product Name"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#344054]">
              Product Stock
            </label>
            <input
              className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
              type="number"
              placeholder="Product Stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#344054]">
              Product Rating
            </label>
            <input
              className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
              type="text"
              placeholder="Product Rating (1–5)"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#344054]">
              Product Description
            </label>
            <textarea
              name=""
              className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#344054]">
              Product Image
            </label>
            <input
              className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <Image
                  src={preview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded"
                  width={48}
                  height={48}
                />
              </div>
            )}
          </div>

          <div>
            <input
              type="checkbox"
              placeholder="Product Rating (1–5)"
              value={formData.featured}
              onChange={handleChange}
              className="mr-1"
            />
            <label className="text-sm font-medium text-[#344054]">
              Featured Product
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex justify-center items-center px-[18px] py-2.5 rounded-lg bg-[#66004b] text-white font-semibold border border-[#66004b] hover:bg-[#55003f] transition-colors cursor-pointer"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
