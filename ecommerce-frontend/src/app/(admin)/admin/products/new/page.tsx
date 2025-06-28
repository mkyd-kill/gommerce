/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/admin/products/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
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
        <Input name="price" label="Price" type="number" value={form.price} onChange={handleChange} />
        <Input name="stock" label="Stock" type="number" value={form.stock} onChange={handleChange} />
        <Input name="category" label="Category" value={form.category} onChange={handleChange} />
        <TextArea name="description" label="Description" value={form.description} onChange={handleChange} />
        <button type="submit" className="bg-[#66004b] text-white px-4 py-2 rounded cursor-pointer">
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