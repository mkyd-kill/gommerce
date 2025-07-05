/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/admin/products/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateProduct } from "@/services/productAPI";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    ID: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    featured: false,
    stock: 0,
    quantity: 0,
    rating: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await CreateProduct(form)
      if (!res) throw new Error();
      toast.success("Product created!");
      router.push("/admin/products");
    } catch {
      toast.error("Error creating product");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <Input name="name" label="Name" value={form.name} onChange={handleChange} />
        <TextArea name="description" label="Description" value={form.description} onChange={handleChange} />
        <Input name="price" label="Price" type="number" value={form.price} onChange={handleChange} />
        <Input name="category" label="Category" value={form.category} onChange={handleChange} />
        <Input name="image" label="Image" type="file" value={form.image} onChange={handleChange} />
        <Input name="featured" label="Featured" value={form.featured} onChange={handleChange} />
        <Input name="stock" label="Stock" type="number" value={form.stock} onChange={handleChange} />
        <Input name="quantity" label="Quantity" type="number" value={form.quantity} onChange={handleChange} />
        <Input name="rating" label="Rating" type="number" value={form.rating} onChange={handleChange} />
        <button type="submit" className="bg-[#66004b] text-white px-4 py-2 rounded cursor-pointer justify-right text-right">
          Create Product
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded" />
    </div>
  );
}

function TextArea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <textarea {...props} className="w-full border px-3 py-2 rounded" rows={4} />
    </div>
  );
}